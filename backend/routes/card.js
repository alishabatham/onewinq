const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { protect } = require('../middleware/authMiddleware');
const Card = require('../models/Card');
const Profile = require('../models/Profile');
const Analytics = require('../models/Analytics');
const Connection = require('../models/Connection');

// @desc    Get current user's linked card
// @route   GET /api/card/mycard
// @access  Private
router.get('/mycard', protect, async (req, res) => {
  try {
    const card = await Card.findOne({ user: req.user._id });
    if (!card) {
      return res.json({ success: true, card: null, message: 'No card linked yet' });
    }
    res.json({ success: true, card });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Link a card to current user
// @route   POST /api/card/link
// @access  Private
router.post('/link', protect, async (req, res) => {
  try {
    const { cardId } = req.body;

    if (!cardId) {
      return res.status(400).json({ success: false, message: 'Please provide a Card ID' });
    }

    // Check if card exists
    let card = await Card.findOne({ cardId });
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Invalid Card ID. This card code has not been pre-registered by the admin.',
      });
    }

    // Check if this card is already linked
    if (card.user) {
      if (card.user.toString() === req.user._id.toString()) {
        return res.status(400).json({ success: false, message: 'This card is already linked to your account' });
      } else {
        return res.status(400).json({ success: false, message: 'This card is already linked to another user' });
      }
    }

    // Check if the current user already has another card linked
    const existingUserCard = await Card.findOne({ user: req.user._id });
    if (existingUserCard) {
      return res.status(400).json({
        success: false,
        message: `You already have an active card (${existingUserCard.cardId}) linked to your account. Please unlink it first.`,
      });
    }
    
    // Link existing unlinked card
    card.user = req.user._id;
    card.status = 'active';
    await card.save();

    // Update Analytics document to reference this card
    let analytics = await Analytics.findOne({ user: req.user._id });
    if (!analytics) {
      analytics = await Analytics.create({
        user: req.user._id,
        card: card._id,
      });
    } else {
      analytics.card = card._id;
      await analytics.save();
    }

    res.status(200).json({ success: true, card, message: 'Card linked successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Update card status (pause/activate)
// @route   PUT /api/card/status
// @access  Private
router.put('/status', protect, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['active', 'paused'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status. Choose active or paused.' });
    }

    const card = await Card.findOne({ user: req.user._id });
    if (!card) {
      return res.status(404).json({ success: false, message: 'No card found to update' });
    }

    card.status = status;
    await card.save();

    res.json({ success: true, card, message: `Card status updated to ${status}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Unlink current card
// @route   POST /api/card/unlink
// @access  Private
router.post('/unlink', protect, async (req, res) => {
  try {
    const card = await Card.findOne({ user: req.user._id });
    if (!card) {
      return res.status(404).json({ success: false, message: 'No card linked' });
    }

    card.user = null;
    card.status = 'unlinked';
    await card.save();

    // Reset analytics card reference
    const analytics = await Analytics.findOne({ user: req.user._id });
    if (analytics) {
      analytics.card = null;
      await analytics.save();
    }

    res.json({ success: true, message: 'Card unlinked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get public profile via cardId (NFC Tap / Scan / Username / User ID / 'me')
// @route   GET /api/card/public/:cardId
// @access  Public
router.get('/public/:cardId', async (req, res) => {
  try {
    const { cardId } = req.params;
    const isTap = req.query.tap === 'true';

    let profile = null;
    let card = null;

    // Handle 'me' or 'undefined' fallback for authenticated caller
    if (cardId === 'me' || cardId === 'undefined') {
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
          const token = req.headers.authorization.split(' ')[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET || 'onewinq_super_secret_jwt_key_12345');
          if (decoded && decoded.id) {
            profile = await Profile.findOne({ user: decoded.id });
          }
        } catch (e) {
          // invalid token, continue to fallback search
        }
      }
    }

    if (!profile) {
      const cleanId = String(cardId).trim();

      // 1. Try finding by physical cardId (e.g. WINQ-1001)
      card = await Card.findOne({ cardId: cleanId });

      if (card) {
        if (card.status === 'paused') {
          return res.status(403).json({
            success: false,
            status: 'paused',
            message: 'This Digital Card has been paused by the owner.',
          });
        }

        if (!card.user) {
          return res.json({
            success: true,
            linked: false,
            cardId: card.cardId,
            message: 'This OneWinq card has not been activated yet.'
          });
        }

        profile = await Profile.findOne({ user: card.user });
      } else {
        // 2. Try searching by customUsername (case-insensitive)
        profile = await Profile.findOne({
          customUsername: { $regex: new RegExp(`^${cleanId}$`, 'i') }
        });

        // 3. Try searching by Profile ID or User ID (24-character ObjectId)
        if (!profile && mongoose.Types.ObjectId.isValid(cleanId)) {
          profile = await Profile.findById(cleanId) || await Profile.findOne({ user: cleanId });
        }
      }
    }

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Digital Card Profile not found' });
    }

    // Check if the user's card is paused
    if (!card && profile.user) {
      card = await Card.findOne({ user: profile.user });
      if (card && card.status === 'paused') {
        return res.status(403).json({
          success: false,
          status: 'paused',
          message: 'This Digital Card has been paused by the owner.',
        });
      }
    }

    // Increment Analytics & log real activity if associated user exists
    if (profile.user) {
      let analytics = await Analytics.findOne({ user: profile.user });
      if (!analytics) {
        analytics = new Analytics({ user: profile.user });
      }
      analytics.totalViews = (analytics.totalViews || 0) + 1;
      if (isTap) {
        analytics.totalTaps = (analytics.totalTaps || 0) + 1;
      }
      analytics.lastVisit = Date.now();
      
      // Clean up legacy mock items if any
      analytics.recentActivity = (analytics.recentActivity || []).filter(
        a => !['Amit Sharma', 'Priya Mehta', 'John Doe', 'Karan Verma', 'Sneha Iyer'].includes(a.visitorName)
      );

      // Add real view activity event
      analytics.recentActivity.unshift({
        visitorName: 'Digital Card Visitor',
        action: isTap ? 'Tapped NFC Card' : 'Viewed Profile',
        location: 'India',
        timestamp: new Date(),
      });
      if (analytics.recentActivity.length > 25) {
        analytics.recentActivity = analytics.recentActivity.slice(0, 25);
      }

      await analytics.save();
    }

    res.json({
      success: true,
      linked: true,
      profile,
      cardStatus: 'active',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Connect with a card owner (increment connection count & save record)
// @route   POST /api/card/public/:cardId/connect
// @access  Public
router.post('/public/:cardId/connect', async (req, res) => {
  try {
    const { cardId } = req.params;
    const { name, email, mobile, company, designation, notes } = req.body;

    if (!name || (!email && !mobile)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your name and at least an email or mobile number to connect.',
      });
    }

    let profile = null;
    const cleanId = String(cardId).trim();

    // 1. Try finding card by physical cardId
    const card = await Card.findOne({ cardId: cleanId });
    if (card && card.user) {
      profile = await Profile.findOne({ user: card.user });
    } else {
      // 2. Try searching by customUsername
      profile = await Profile.findOne({
        customUsername: { $regex: new RegExp(`^${cleanId}$`, 'i') },
      });

      // 3. Try searching by Profile ID or User ID
      if (!profile && mongoose.Types.ObjectId.isValid(cleanId)) {
        profile = (await Profile.findById(cleanId)) || (await Profile.findOne({ user: cleanId }));
      }
    }

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Digital Card Profile not found' });
    }

    // Optional: check logged in user from Bearer token or body.userId
    let connectedUserId = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'onewinq_super_secret_jwt_key_12345');
        if (decoded && decoded.id) {
          connectedUserId = decoded.id;
        }
      } catch (e) {
        // ignore token error for public connect
      }
    }

    if (!connectedUserId && req.body.userId && mongoose.Types.ObjectId.isValid(req.body.userId)) {
      connectedUserId = req.body.userId;
    }

    // Save connection entry
    const newConnection = await Connection.create({
      cardOwner: profile.user,
      connectedUser: connectedUserId,
      visitorName: name,
      visitorEmail: email || '',
      visitorMobile: mobile || '',
      visitorCompany: company || '',
      visitorDesignation: designation || '',
      notes: notes || '',
    });

    // Increment profile.totalConnections
    profile.totalConnections = (profile.totalConnections || 0) + 1;
    profile.connectionsCount = `${profile.totalConnections}`;
    await profile.save();

    // 1. Log connection event in Analytics for Card Owner (User A)
    if (profile.user) {
      let analytics = await Analytics.findOne({ user: profile.user });
      if (!analytics) {
        analytics = new Analytics({ user: profile.user });
      }
      analytics.leadsGenerated = (analytics.leadsGenerated || 0) + 1;
      analytics.recentActivity = (analytics.recentActivity || []).filter(
        a => !['Amit Sharma', 'Priya Mehta', 'John Doe', 'Karan Verma', 'Sneha Iyer'].includes(a.visitorName)
      );
      analytics.recentActivity.unshift({
        visitorName: name,
        action: 'Connected & Exchanged Info',
        location: company ? `${company}` : 'India',
        timestamp: new Date(),
      });
      if (analytics.recentActivity.length > 25) {
        analytics.recentActivity = analytics.recentActivity.slice(0, 25);
      }
      await analytics.save();
    }

    // 2. Log connection event in Analytics for Connected User (User B) if logged in
    if (connectedUserId && String(connectedUserId) !== String(profile.user)) {
      let visitorAnalytics = await Analytics.findOne({ user: connectedUserId });
      if (!visitorAnalytics) {
        visitorAnalytics = new Analytics({ user: connectedUserId });
      }
      visitorAnalytics.leadsGenerated = (visitorAnalytics.leadsGenerated || 0) + 1;
      visitorAnalytics.recentActivity = (visitorAnalytics.recentActivity || []).filter(
        a => !['Amit Sharma', 'Priya Mehta', 'John Doe', 'Karan Verma', 'Sneha Iyer'].includes(a.visitorName)
      );
      visitorAnalytics.recentActivity.unshift({
        visitorName: profile.name || 'Professional',
        action: 'Connected to Card',
        location: profile.companyName ? `${profile.companyName}` : 'India',
        timestamp: new Date(),
      });
      if (visitorAnalytics.recentActivity.length > 25) {
        visitorAnalytics.recentActivity = visitorAnalytics.recentActivity.slice(0, 25);
      }
      await visitorAnalytics.save();

      // Also update visitor's profile totalConnections count
      let visitorProfile = await Profile.findOne({ user: connectedUserId });
      if (visitorProfile) {
        visitorProfile.totalConnections = (visitorProfile.totalConnections || 0) + 1;
        visitorProfile.connectionsCount = `${visitorProfile.totalConnections}`;
        await visitorProfile.save();
      }
    }

    res.status(201).json({
      success: true,
      message: `Successfully connected with ${profile.name}!`,
      totalConnections: profile.totalConnections,
      connection: newConnection,
    });
  } catch (error) {
    console.error('Error connecting with profile:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

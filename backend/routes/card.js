const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Card = require('../models/Card');
const Profile = require('../models/Profile');
const Analytics = require('../models/Analytics');

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

    // Check if card is already linked to someone else
    let card = await Card.findOne({ cardId });

    if (card) {
      if (card.user) {
        if (card.user.toString() === req.user._id.toString()) {
          return res.status(400).json({ success: false, message: 'This card is already linked to your account' });
        } else {
          return res.status(400).json({ success: false, message: 'This card is already linked to another user' });
        }
      }
      
      // Link existing unlinked card
      card.user = req.user._id;
      card.status = 'active';
      await card.save();
    } else {
      return res.status(404).json({
        success: false,
        message: 'Invalid Card ID. This card code has not been pre-registered by the admin.',
      });
    }

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

// @desc    Get public profile via cardId (NFC Tap / Scan)
// @route   GET /api/card/public/:cardId
// @access  Public
router.get('/public/:cardId', async (req, res) => {
  try {
    const { cardId } = req.params;
    const isTap = req.query.tap === 'true';

    const card = await Card.findOne({ cardId });
    if (!card) {
      return res.status(404).json({ success: false, message: 'Card not found' });
    }

    if (card.status === 'paused') {
      return res.status(403).json({
        success: false,
        status: 'paused',
        message: 'This Digital Card has been paused by the owner.',
      });
    }

    if (!card.user) {
      return res.status(400).json({ success: false, message: 'Card is not linked to any user yet' });
    }

    // Get owner profile
    const profile = await Profile.findOne({ user: card.user });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    // Increment Analytics
    let analytics = await Analytics.findOne({ user: card.user });
    if (!analytics) {
      analytics = new Analytics({ user: card.user, card: card._id });
    }

    analytics.totalViews += 1;
    if (isTap) {
      analytics.totalTaps += 1;
    }
    analytics.lastVisit = Date.now();
    await analytics.save();

    res.json({
      success: true,
      profile,
      cardStatus: card.status,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Card = require('../models/Card');
const Analytics = require('../models/Analytics');

// Apply protection and admin filters to all admin routes
router.use(protect);
router.use(admin);

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCards = await Card.countDocuments();
    
    // Aggregate views and taps
    const analyticsList = await Analytics.find();
    let totalViews = 0;
    let totalTaps = 0;
    analyticsList.forEach(a => {
      totalViews += a.totalViews || 0;
      totalTaps += a.totalTaps || 0;
    });

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalCards,
        totalViews,
        totalTaps,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get All Users with their profile
// @route   GET /api/admin/users
// @access  Private/Admin
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    const usersWithProfiles = await Promise.all(
      users.map(async (user) => {
        const profile = await Profile.findOne({ user: user._id });
        const card = await Card.findOne({ user: user._id });
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          hasProfile: !!profile,
          cardId: card ? card.cardId : null,
          cardStatus: card ? card.status : null,
        };
      })
    );
    res.json({ success: true, users: usersWithProfiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get All Cards in the system
// @route   GET /api/admin/cards
// @access  Private/Admin
router.get('/cards', async (req, res) => {
  try {
    const cards = await Card.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json({ success: true, cards });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Pre-generate multiple card codes
// @route   POST /api/admin/cards/generate
// @access  Private/Admin
router.post('/cards/generate', async (req, res) => {
  try {
    const { count } = req.body;
    const numToGenerate = parseInt(count) || 5;

    const generatedCards = [];
    for (let i = 0; i < numToGenerate; i++) {
      // Create random unique string
      const cardId = 'winq-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      
      // Check if duplicate (extremely rare, but safe)
      const exists = await Card.findOne({ cardId });
      if (exists) {
        i--; // Retry
        continue;
      }

      const card = await Card.create({
        cardId,
        status: 'unlinked',
      });
      generatedCards.push(card);
    }

    res.status(201).json({
      success: true,
      message: `Successfully generated ${numToGenerate} cards`,
      cards: generatedCards,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Update User Role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
router.put('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    const user = await User.findById(req.id);
    if (!user) {
      const targetUser = await User.findById(req.params.id);
      if (!targetUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      targetUser.role = role;
      await targetUser.save();
      return res.json({ success: true, message: `User role updated to ${role}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Delete user account and all references
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
router.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Don't let admin delete themselves
    if (userId.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own admin account' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Delete profile
    await Profile.deleteOne({ user: userId });

    // Delete analytics
    await Analytics.deleteOne({ user: userId });

    // Unlink card instead of deleting physical card code
    const card = await Card.findOne({ user: userId });
    if (card) {
      card.user = null;
      card.status = 'unlinked';
      await card.save();
    }

    // Delete user
    await User.deleteOne({ _id: userId });

    res.json({ success: true, message: 'User and all associated data deleted and card unlinked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Force Unlink Card
// @route   POST /api/admin/cards/unlink/:cardId
// @access  Private/Admin
router.post('/cards/unlink/:cardId', async (req, res) => {
  try {
    const card = await Card.findOne({ cardId: req.params.cardId });
    if (!card) {
      return res.status(404).json({ success: false, message: 'Card not found' });
    }

    if (card.user) {
      // Remove card reference from owner's analytics
      await Analytics.findOneAndUpdate({ user: card.user }, { card: null });
    }

    card.user = null;
    card.status = 'unlinked';
    await card.save();

    res.json({ success: true, message: 'Card unlinked successfully by admin' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

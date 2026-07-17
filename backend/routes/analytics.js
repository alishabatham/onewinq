const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Analytics = require('../models/Analytics');

// @desc    Get user card analytics
// @route   GET /api/analytics
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let analytics = await Analytics.findOne({ user: req.user._id });
    if (!analytics) {
      analytics = await Analytics.create({
        user: req.user._id,
      });
    }
    res.json({ success: true, analytics });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

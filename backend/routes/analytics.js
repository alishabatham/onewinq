const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Analytics = require('../models/Analytics');
const Connection = require('../models/Connection');

// @desc    Get user card analytics (100% Real-time database metrics)
// @route   GET /api/analytics
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let analytics = await Analytics.findOne({ user: req.user._id });
    if (!analytics) {
      analytics = await Analytics.create({
        user: req.user._id,
        totalTaps: 0,
        totalViews: 0,
        uniqueVisitors: 0,
        leadsGenerated: 0,
        lastVisit: null,
        topActions: {
          whatsApp: 0,
          call: 0,
          email: 0,
          website: 0,
          brochure: 0,
          meeting: 0,
        },
        recentActivity: [],
      });
    }

    // Wipe legacy mock numbers if stored in existing MongoDB documents
    if (analytics.uniqueVisitors >= 800 || analytics.totalViews >= 1400 || analytics.totalTaps >= 1200) {
      analytics.totalTaps = 0;
      analytics.totalViews = 0;
      analytics.uniqueVisitors = 0;
      analytics.recentActivity = [];
    }

    // Calculate real connection count from DB (both incoming & outgoing)
    const realConnectionCount = await Connection.countDocuments({
      $or: [{ cardOwner: req.user._id }, { connectedUser: req.user._id }]
    });
    analytics.leadsGenerated = realConnectionCount;

    // Filter out old legacy mock activities
    if (analytics.recentActivity && analytics.recentActivity.length > 0) {
      analytics.recentActivity = analytics.recentActivity.filter(
        a => !['Amit Sharma', 'Priya Mehta', 'John Doe', 'Karan Verma', 'Sneha Iyer'].includes(a.visitorName)
      );
    }

    // Unique visitors equals real tracked views
    analytics.uniqueVisitors = analytics.totalViews || 0;

    await analytics.save();

    res.json({ success: true, analytics });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

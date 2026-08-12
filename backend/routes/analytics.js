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


    // Calculate real unique connection count from DB (both incoming & outgoing)
    const rawConnections = await Connection.find({
      $or: [{ cardOwner: req.user._id }, { connectedUser: req.user._id }]
    });

    const seenLeads = new Set();
    for (const conn of rawConnections) {
      let key = null;
      const isOwner = String(conn.cardOwner) === String(req.user._id);
      const otherUser = isOwner ? conn.connectedUser : conn.cardOwner;

      if (otherUser) {
        key = `user_${otherUser}`;
      } else if (conn.visitorEmail) {
        key = `email_${conn.visitorEmail.trim().toLowerCase()}`;
      } else if (conn.visitorMobile) {
        key = `mobile_${conn.visitorMobile.trim()}`;
      } else {
        key = `id_${conn._id}`;
      }
      seenLeads.add(key);
    }

    analytics.leadsGenerated = seenLeads.size;


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

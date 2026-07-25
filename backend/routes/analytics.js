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
        totalTaps: 1246,
        totalViews: 1450,
        uniqueVisitors: 832,
        leadsGenerated: 213,
        lastVisit: new Date(),
        topActions: {
          whatsApp: 45,
          call: 25,
          email: 15,
          website: 15,
          brochure: 12,
          meeting: 8,
        },
        recentActivity: [
          { visitorName: 'Amit Sharma', action: 'Viewed your profile', location: 'Delhi, India', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
          { visitorName: 'Priya Mehta', action: 'Clicked on WhatsApp', location: 'Mumbai, India', timestamp: new Date(Date.now() - 1000 * 60 * 25) },
          { visitorName: 'John Doe', action: 'Downloaded Brochure', location: 'New York, USA', timestamp: new Date(Date.now() - 1000 * 60 * 50) },
          { visitorName: 'Karan Verma', action: 'Viewed Services', location: 'Bengaluru, India', timestamp: new Date(Date.now() - 1000 * 60 * 90) },
          { visitorName: 'Sneha Iyer', action: 'Clicked on Website', location: 'Hyderabad, India', timestamp: new Date(Date.now() - 1000 * 60 * 130) },
        ],
      });
    } else {
      // Ensure defaults for optional existing records
      let updated = false;
      if (!analytics.uniqueVisitors) { analytics.uniqueVisitors = 832; updated = true; }
      if (!analytics.leadsGenerated) { analytics.leadsGenerated = 213; updated = true; }
      if (!analytics.recentActivity || analytics.recentActivity.length === 0) {
        analytics.recentActivity = [
          { visitorName: 'Amit Sharma', action: 'Viewed your profile', location: 'Delhi, India', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
          { visitorName: 'Priya Mehta', action: 'Clicked on WhatsApp', location: 'Mumbai, India', timestamp: new Date(Date.now() - 1000 * 60 * 25) },
          { visitorName: 'John Doe', action: 'Downloaded Brochure', location: 'New York, USA', timestamp: new Date(Date.now() - 1000 * 60 * 50) },
          { visitorName: 'Karan Verma', action: 'Viewed Services', location: 'Bengaluru, India', timestamp: new Date(Date.now() - 1000 * 60 * 90) },
          { visitorName: 'Sneha Iyer', action: 'Clicked on Website', location: 'Hyderabad, India', timestamp: new Date(Date.now() - 1000 * 60 * 130) },
        ];
        updated = true;
      }
      if (updated) {
        await analytics.save();
      }
    }
    res.json({ success: true, analytics });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
    default: null,
  },
  totalTaps: {
    type: Number,
    default: 0,
  },
  totalViews: {
    type: Number,
    default: 0,
  },
  uniqueVisitors: {
    type: Number,
    default: 0,
  },
  leadsGenerated: {
    type: Number,
    default: 0,
  },
  lastVisit: {
    type: Date,
    default: null,
  },
  recentActivity: [
    {
      visitorName: { type: String, default: 'Anonymous Visitor' },
      action: { type: String, default: 'Viewed profile' },
      location: { type: String, default: 'India' },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  topActions: {
    whatsApp: { type: Number, default: 0 },
    call: { type: Number, default: 0 },
    email: { type: Number, default: 0 },
    website: { type: Number, default: 0 },
    brochure: { type: Number, default: 0 },
    meeting: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);

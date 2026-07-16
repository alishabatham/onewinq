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
  lastVisit: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);

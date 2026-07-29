const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
  cardOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  connectedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  visitorName: {
    type: String,
    required: true,
    trim: true,
  },
  visitorEmail: {
    type: String,
    trim: true,
    default: '',
  },
  visitorMobile: {
    type: String,
    trim: true,
    default: '',
  },
  visitorCompany: {
    type: String,
    trim: true,
    default: '',
  },
  visitorDesignation: {
    type: String,
    trim: true,
    default: '',
  },
  notes: {
    type: String,
    trim: true,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Connection', ConnectionSchema);

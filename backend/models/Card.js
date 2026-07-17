const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  cardId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null, // Null means it's a new card waiting to be linked
  },
  status: {
    type: String,
    enum: ['unlinked', 'active', 'paused'],
    default: 'unlinked',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Card', CardSchema);

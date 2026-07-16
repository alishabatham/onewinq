const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  // Basic Details
  profilePhoto: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  designation: {
    type: String,
    trim: true,
    default: '',
  },
  companyName: {
    type: String,
    trim: true,
    default: '',
  },
  about: {
    type: String,
    trim: true,
    default: '',
  },
  mobile: {
    type: String,
    trim: true,
    default: '',
  },
  email: {
    type: String,
    trim: true,
    default: '',
  },
  website: {
    type: String,
    trim: true,
    default: '',
  },
  whatsApp: {
    type: String,
    trim: true,
    default: '',
  },
  address: {
    type: String,
    trim: true,
    default: '',
  },
  // Social Links
  socialLinks: {
    linkedIn: { type: String, default: '' },
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    gitHub: { type: String, default: '' },
  },
  // Company Details
  company: {
    logo: { type: String, default: '' },
    description: { type: String, default: '' },
    website: { type: String, default: '' },
    brochure: { type: String, default: '' }, // URL to PDF
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
ProfileSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Profile', ProfileSchema);

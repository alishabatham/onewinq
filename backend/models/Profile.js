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
  // Template & Customization
  templateId: {
    type: String,
    default: 'nova',
  },
  customUsername: {
    type: String,
    trim: true,
    default: '',
  },
  tagline: {
    type: String,
    trim: true,
    default: '',
  },
  vision: {
    type: String,
    trim: true,
    default: '',
  },
  techStack: [{ type: String }],
  // Highlights Card Fields (Experience, Skills, Projects, Education, Resume)
  experience: {
    type: String,
    trim: true,
    default: '2+ Years',
  },
  skillsCount: {
    type: String,
    trim: true,
    default: '12+ Skills',
  },
  projectsCount: {
    type: String,
    trim: true,
    default: '6+ Projects',
  },
  education: {
    type: String,
    trim: true,
    default: 'B.Tech CSE',
  },
  resume: {
    type: String,
    trim: true,
    default: '',
  },
  // Identity Platform Layers (Who I Am, What I Do, Roles, Conversation Starters, Currently, Looking For, Availability)
  whatIDo: {
    type: String,
    trim: true,
    default: '',
  },
  roles: {
    type: String,
    trim: true,
    default: '',
  },
  conversationStarters: {
    type: String,
    trim: true,
    default: '',
  },
  currently: {
    type: String,
    trim: true,
    default: '',
  },
  lookingFor: {
    type: String,
    trim: true,
    default: '',
  },
  availability: {
    type: String,
    trim: true,
    default: 'Open for Opportunities',
  },
  // Extended Digital Identity & Let's Connect Fields
  meetingLink: {
    type: String,
    trim: true,
    default: '',
  },
  videoUrl: {
    type: String,
    trim: true,
    default: '',
  },
  cardStyle: {
    type: String,
    default: 'black_signature',
  },
  experienceTimeline: [
    {
      period: { type: String, trim: true, default: '' },
      role: { type: String, trim: true, default: '' },
      company: { type: String, trim: true, default: '' },
      desc: { type: String, trim: true, default: '' },
    },
  ],
  achievements: [
    {
      title: { type: String, trim: true, default: '' },
      subtitle: { type: String, trim: true, default: '' },
      year: { type: String, trim: true, default: '' },
    },
  ],
  companiesBuilt: { type: String, trim: true, default: '' },
  connectionsCount: { type: String, trim: true, default: '' },
  totalConnections: { type: Number, default: 0 },
  experienceLabel: { type: String, trim: true, default: '' },
  connectionsLabel: { type: String, trim: true, default: '' },
  companiesLabel: { type: String, trim: true, default: '' },
  skills: [{ type: String, trim: true }],
  services: [
    {
      title: { type: String, trim: true },
      description: { type: String, trim: true },
      icon: { type: String, default: 'Zap' },
    },
  ],
  featuredWork: [
    {
      title: { type: String, trim: true, default: '' },
      tag: { type: String, trim: true, default: '' },
      description: { type: String, trim: true, default: '' },
      image: { type: String, trim: true, default: '' },
      link: { type: String, trim: true, default: '' },
    },
  ],
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

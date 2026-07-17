const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { protect } = require('../middleware/authMiddleware');
const Profile = require('../models/Profile');

// Configure Local Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = process.env.NODE_ENV === 'production'
      ? '/tmp'
      : path.join(__dirname, '../uploads');
    if (process.env.NODE_ENV !== 'production' && !fs.existsSync(uploadDir)) {
      try {
        fs.mkdirSync(uploadDir, { recursive: true });
      } catch (err) {
        console.warn('Could not create directory:', err.message);
      }
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images (jpeg, jpg, png, gif) and PDFs are allowed!'));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Configure Cloudinary if credentials present
const isCloudinaryConfigured = 
  process.env.UPLOAD_TYPE === 'cloudinary' &&
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// @desc    Get current user profile
// @route   GET /api/profile/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      profile = await Profile.create({
        user: req.user._id,
        name: req.user.name,
        email: req.user.email,
      });
    }
    res.json({ success: true, profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Update user profile
// @route   PUT /api/profile/me
// @access  Private
router.put('/me', protect, async (req, res) => {
  try {
    const {
      name,
      designation,
      companyName,
      about,
      mobile,
      email,
      website,
      whatsApp,
      address,
      socialLinks,
      company,
      profilePhoto,
    } = req.body;

    let profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      profile = new Profile({ user: req.user._id });
    }

    // Update fields
    profile.name = name !== undefined ? name : profile.name;
    profile.designation = designation !== undefined ? designation : profile.designation;
    profile.companyName = companyName !== undefined ? companyName : profile.companyName;
    profile.about = about !== undefined ? about : profile.about;
    profile.mobile = mobile !== undefined ? mobile : profile.mobile;
    profile.email = email !== undefined ? email : profile.email;
    profile.website = website !== undefined ? website : profile.website;
    profile.whatsApp = whatsApp !== undefined ? whatsApp : profile.whatsApp;
    profile.address = address !== undefined ? address : profile.address;
    
    if (profilePhoto !== undefined) {
      profile.profilePhoto = profilePhoto;
    }

    // Update nested Social Links
    if (socialLinks) {
      profile.socialLinks = {
        linkedIn: socialLinks.linkedIn !== undefined ? socialLinks.linkedIn : profile.socialLinks.linkedIn,
        instagram: socialLinks.instagram !== undefined ? socialLinks.instagram : profile.socialLinks.instagram,
        facebook: socialLinks.facebook !== undefined ? socialLinks.facebook : profile.socialLinks.facebook,
        twitter: socialLinks.twitter !== undefined ? socialLinks.twitter : profile.socialLinks.twitter,
        gitHub: socialLinks.gitHub !== undefined ? socialLinks.gitHub : profile.socialLinks.gitHub,
      };
    }

    // Update nested Company details
    if (company) {
      profile.company = {
        logo: company.logo !== undefined ? company.logo : profile.company.logo,
        description: company.description !== undefined ? company.description : profile.company.description,
        website: company.website !== undefined ? company.website : profile.company.website,
        brochure: company.brochure !== undefined ? company.brochure : profile.company.brochure,
      };
    }

    await profile.save();
    res.json({ success: true, profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Upload file (profile photo, logo, brochure)
// @route   POST /api/profile/upload
// @access  Private
router.post('/upload', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }

    // If Cloudinary is configured, upload to Cloudinary and delete local temp file
    if (isCloudinaryConfigured) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          resource_type: 'auto', // Detects images or PDFs automatically
          folder: 'onewinq_mvp',
        });
        
        // Remove local file
        fs.unlinkSync(req.file.path);
        
        return res.json({
          success: true,
          url: result.secure_url,
          filename: req.file.filename,
        });
      } catch (cloudErr) {
        console.error('Cloudinary upload error, falling back to local storage:', cloudErr);
        // Continue to local storage if Cloudinary fails
      }
    }

    // Local file url
    const serverUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({
      success: true,
      url: serverUrl,
      filename: req.file.filename,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

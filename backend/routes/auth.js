const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Analytics = require('../models/Analytics');
const { protect } = require('../middleware/authMiddleware');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'onewinq_super_secret_jwt_key_12345', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    // Check if this is the first user in the database to grant admin privileges
    const isFirstUser = (await User.countDocuments({})) === 0;

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: isFirstUser ? 'admin' : 'user',
    });

    if (user) {
      // Auto-create empty profile
      await Profile.create({
        user: user._id,
        name: user.name,
        email: user.email,
      });

      // Auto-create empty analytics
      await Analytics.create({
        user: user._id,
      });

      res.status(201).json({
        success: true,
        token: generateToken(user._id),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email (with password selected since default is false)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get current user profile (for auth state check)
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Forgot Password (Mock Reset Link generation)
// @route   POST /api/auth/forgotpassword
// @access  Public
router.post('/forgotpassword', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'No user registered with this email' });
    }

    // In a production app, we would send an email with a reset token.
    // For MVP, we will return a simulated reset token so the user can easily reset.
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'onewinq_super_secret_jwt_key_12345', {
      expiresIn: '10m', // 10 minutes expiry
    });

    res.json({
      success: true,
      message: 'Password reset link generated successfully.',
      resetToken, // Return the token for UI simulation
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Reset Password using token
// @route   PUT /api/auth/resetpassword/:token
// @access  Public
router.put('/resetpassword/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'onewinq_super_secret_jwt_key_12345');
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Invalid or expired token' });
    }

    user.password = password;
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successful. You can now login.',
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: 'Token is invalid or has expired' });
  }
});

const Card = require('../models/Card');

// @desc    Change password
// @route   PUT /api/auth/changepassword
// @access  Private
router.put('/changepassword', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Delete account
// @route   DELETE /api/auth/deleteaccount
// @access  Private
router.delete('/deleteaccount', protect, async (req, res) => {
  try {
    const userId = req.user._id;

    // Delete user profile
    await Profile.deleteOne({ user: userId });

    // Delete analytics
    await Analytics.deleteOne({ user: userId });

    // Unlink card
    const card = await Card.findOne({ user: userId });
    if (card) {
      card.user = null;
      card.status = 'unlinked';
      await card.save();
    }

    // Delete user
    await User.deleteOne({ _id: userId });

    res.json({ success: true, message: 'Your account and all associated data have been permanently deleted.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;


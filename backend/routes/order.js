const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// @desc    Create a new NFC Card Order
// @route   POST /api/orders
// @access  Public (or authenticated if token present)
router.post('/', async (req, res) => {
  try {
    const { cardName, price, customerName, phone, shippingAddress, userId } = req.body;

    if (!cardName || !price || !customerName || !phone || !shippingAddress) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required order details (Name, Phone, Address, Card info)',
      });
    }

    const order = await Order.create({
      user: userId || null,
      cardName,
      price,
      customerName,
      phone,
      shippingAddress,
      status: 'Pending',
      isReadByAdmin: false,
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully! Admin has been notified.',
      order,
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

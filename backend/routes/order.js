const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// @desc    Create a new NFC Card Order
// @route   POST /api/orders
// @access  Public (or authenticated if token present)
router.post('/', async (req, res) => {
  try {
    const { 
      cardName, 
      cardColor, 
      customNameOnCard, 
      price, 
      customerName, 
      email, 
      phone, 
      shippingAddress, 
      paymentStatus, 
      paymentMethod, 
      transactionId, 
      notes, 
      userId 
    } = req.body;

    if (!cardName || !price || !customerName || !phone || !shippingAddress) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required order details (Name, Phone, Address, Card info)',
      });
    }

    // Parse numeric price for revenue analytics (e.g., "₹2,999" -> 2999)
    const numericStr = String(price).replace(/[^0-9.]/g, '');
    const priceNumeric = parseFloat(numericStr) || 0;

    const order = await Order.create({
      user: userId || null,
      cardName,
      cardColor: cardColor || 'Black',
      customNameOnCard: customNameOnCard || customerName,
      price,
      priceNumeric,
      customerName,
      email: email || '',
      phone,
      shippingAddress,
      paymentStatus: paymentStatus || 'Paid',
      paymentMethod: paymentMethod || 'UPI',
      transactionId: transactionId || '',
      notes: notes || '',
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

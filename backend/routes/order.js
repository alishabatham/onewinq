const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Order = require('../models/Order');
const { createRazorpayOrder, verifyPaymentSignature } = require('../services/razorpayService');
const { razorpayKeyId } = require('../config/razorpay');

const PRODUCT_PLANS = {
  free_plan: {
    productType: 'free_plan',
    name: 'Free Plan',
    displayPrice: '₹0',
    amount: 0,
    currency: 'INR',
    category: 'plan',
  },
  pro_plan: {
    productType: 'pro_plan',
    name: 'Pro Plan',
    displayPrice: '₹999/year',
    amount: 99900,
    currency: 'INR',
    category: 'plan',
  },
  essential_card: {
    productType: 'essential_card',
    name: 'Essential Card',
    displayPrice: '₹499',
    amount: 49900,
    currency: 'INR',
    category: 'card',
  },
  signature_card: {
    productType: 'signature_card',
    name: 'Signature Card',
    displayPrice: '₹999',
    amount: 99900,
    currency: 'INR',
    category: 'card',
  },
  metal_card: {
    productType: 'metal_card',
    name: 'Metal NFC Card',
    displayPrice: '₹2,999',
    amount: 299900,
    currency: 'INR',
    category: 'card',
  },
  business_card: {
    productType: 'business_card',
    name: 'Business Card',
    displayPrice: 'Contact Sales',
    amount: 0,
    currency: 'INR',
    category: 'card',
  },
  founder_edition_card: {
    productType: 'founder_edition_card',
    name: 'Founder Edition Card (Limited)',
    displayPrice: '₹4,999',
    amount: 499900,
    currency: 'INR',
    category: 'card',
  },
};

const currencyValue = (value) => Number(value) || 0;

const getProductDefinition = (productType) => {
  if (!productType || !PRODUCT_PLANS[productType]) {
    return null;
  }

  return PRODUCT_PLANS[productType];
};

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
      productType: 'legacy_card_order',
      amount: currencyValue(price.replace(/[^0-9]/g, '')) || 0,
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

// @desc    Create Razorpay payment order from backend price rules
// @route   POST /api/orders/create-payment-order
// @access  Public / authenticated optional
router.post('/create-payment-order', async (req, res) => {
  try {
    const {
      productType,
      cardName,
      customerName,
      phone,
      shippingAddress,
      userId,
    } = req.body;

    const selectedProduct = getProductDefinition(productType);

    if (!selectedProduct) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product type supplied for payment order.',
      });
    }

    if (selectedProduct.amount === 0) {
      return res.status(400).json({
        success: false,
        message: 'The selected product is free and does not require Razorpay Checkout.',
      });
    }

    if (selectedProduct.category === 'card' && (!customerName || !phone || !shippingAddress)) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, and shipping address are required before card payment.',
      });
    }

    if (selectedProduct.category === 'plan' && (!customerName || !phone)) {
      return res.status(400).json({
        success: false,
        message: 'Name and phone are required before plan payment.',
      });
    }

    const inferredOrderName = cardName || selectedProduct.name;

    const order = await Order.create({
      user: userId || null,
      productType: selectedProduct.productType,
      cardName: inferredOrderName,
      price: selectedProduct.displayPrice,
      amount: selectedProduct.amount,
      currency: selectedProduct.currency,
      customerName: customerName || '',
      phone: phone || '',
      shippingAddress: shippingAddress || '',
      status: 'created',
      paymentMethod: 'Razorpay',
      isReadByAdmin: false,
    });

    const razorpayOrder = await createRazorpayOrder({
      amount: selectedProduct.amount,
      currency: selectedProduct.currency,
      receipt: order._id.toString(),
      notes: {
        orderId: order._id.toString(),
        productType: selectedProduct.productType,
      },
    });

    await Order.findByIdAndUpdate(order._id, {
      razorpayOrderId: razorpayOrder.id,
      status: 'created',
      amount: selectedProduct.amount,
      currency: selectedProduct.currency,
    });

    const payload = {
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: razorpayKeyId,
      mongoOrderId: order._id.toString(),
    };

    return res.status(201).json(payload);
  } catch (error) {
    console.error('Error creating Razorpay payment order:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Unable to create payment order.',
    });
  }
});

// @desc    Verify Razorpay checkout response signature server-side
// @route   POST /api/orders/verify-payment
// @access  Public request body contains Razorpay data
router.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing Razorpay payment verification payload.',
      });
    }

    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found for Razorpay verification.',
      });
    }

    const verified = verifyPaymentSignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!verified) {
      await Order.findByIdAndUpdate(order._id, {
        status: 'failed',
        failureReason: 'Payment verification failed',
      });

      return res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }

    if (order.status === 'paid') {
      return res.json({
        success: true,
        message: 'Payment already verified',
        order,
      });
    }

    await Order.findByIdAndUpdate(order._id, {
      status: 'paid',
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      paymentMethod: 'Razorpay',
      failureReason: '',
    });

    return res.json({
      success: true,
      message: 'Payment verified successfully',
    });
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Payment verification error',
    });
  }
});

module.exports = router;

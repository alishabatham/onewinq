const crypto = require('crypto');
const { razorpay, razorpayKeySecret, webhookSecret } = require('../config/razorpay');

const createRazorpayOrder = async ({ amount, currency = 'INR', receipt, notes }) => {
  if (!razorpay || !process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay credentials are not configured.');
  }

  if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
    throw new Error('Invalid Razorpay amount.');
  }

  try {
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(Number(amount)),
      currency,
      receipt,
      notes,
    });

    return razorpayOrder;
  } catch (error) {
    throw new Error(error?.message || 'Failed to create Razorpay order.');
  }
};

const verifyPaymentSignature = ({ orderId, paymentId, signature }) => {
  if (!orderId || !paymentId || !signature || !razorpayKeySecret) {
    return false;
  }

  if (typeof signature !== 'string') {
    return false;
  }

  const body = `${orderId}|${paymentId}`;
  const expected = crypto
    .createHmac('sha256', razorpayKeySecret)
    .update(body)
    .digest('hex');

  try {
    if (expected.length !== signature.length) {
      return false;
    }

    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch (error) {
    return false;
  }
};

const verifyWebhookSignature = ({ rawBody, signature }) => {
  if (!rawBody || !signature || !webhookSecret) {
    return false;
  }

  if (typeof signature !== 'string' || typeof rawBody !== 'string') {
    return false;
  }

  const expected = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBody)
    .digest('hex');

  try {
    if (expected.length !== signature.length) {
      return false;
    }

    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch (error) {
    return false;
  }
};

module.exports = {
  createRazorpayOrder,
  verifyPaymentSignature,
  verifyWebhookSignature,
};

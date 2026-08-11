const Razorpay = require('razorpay');

const requiredBackendEnv = ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET'];

const missing = requiredBackendEnv.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.warn(`Razorpay environment missing: ${missing.join(', ')}. Razorpay APIs will be unavailable until these are configured.`);
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

module.exports = {
  razorpay,
  razorpayKeyId: process.env.RAZORPAY_KEY_ID || '',
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || '',
  webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || '',
  hasRazorpayCredentials: Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET),
};

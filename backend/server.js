const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const connectDB = require('./config/db');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

const { verifyWebhookSignature } = require('./services/razorpayService');
const Order = require('./models/Order');

app.post('/api/orders/webhook/razorpay', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const rawBody = req.body ? req.body.toString('utf8') : '';

    const valid = verifyWebhookSignature({ rawBody, signature: signature || '' });

    if (!valid) {
      return res.status(400).json({ success: false, message: 'Invalid Razorpay webhook signature' });
    }

    const event = JSON.parse(rawBody);
    const payload = event.payload || {};
    const paymentEntity = payload.payment?.entity || {};
    const orderEntity = payload.order?.entity || {};

    if (!event || !event.event) {
      return res.status(400).json({ success: false, message: 'Invalid Razorpay webhook payload' });
    }

    const razorpayOrderId = orderEntity.id || paymentEntity.order_id;

    if (razorpayOrderId) {
      const order = await Order.findOne({ razorpayOrderId: razorpayOrderId });
      if (order) {
        if (event.event === 'payment.captured' || event.event === 'order.paid') {
          await Order.findByIdAndUpdate(order._id, {
            status: 'paid',
            razorpayPaymentId: paymentEntity.id || order.razorpayPaymentId || null,
            razorpaySignature: order.razorpaySignature || null,
            paymentMethod: 'Razorpay',
            failureReason: '',
          });
        }

        if (event.event === 'payment.failed') {
          await Order.findByIdAndUpdate(order._id, {
            status: 'failed',
            failureReason: paymentEntity.error_description || 'Razorpay payment failed',
          });
        }

        if (event.event === 'refund.created' || event.event === 'refund.processed') {
          await Order.findByIdAndUpdate(order._id, {
            status: 'refunded',
          });
        }
      }
    }

    return res.json({ success: true, received: true });
  } catch (error) {
    console.error('Webhook processing error:', error.message);
    return res.status(400).json({ success: false, message: 'Webhook processing failed' });
  }
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure upload directory exists
const uploadsDir = process.env.NODE_ENV === 'production'
  ? '/tmp'
  : path.join(__dirname, 'uploads');

if (process.env.NODE_ENV !== 'production' && !fs.existsSync(uploadsDir)) {
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
  } catch (err) {
    console.warn('Warning: Could not create upload directory:', err.message);
  }
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// Route handlers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/card', require('./routes/card'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/orders', require('./routes/order'));
app.use('/api/admin', require('./routes/admin'));

// Root endpoint for status check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'OneWinq NFC Card Management API is active.',
    version: '1.0.0 (MVP)'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Export app for serverless environment
module.exports = app;

// Start Server locally or via direct execution
if (require.main === module) {
  let PORT = parseInt(process.env.PORT, 10) || 5000;
  
  const startServer = (portToTry) => {
    const server = app.listen(portToTry, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${portToTry}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`Port ${portToTry} is in use, trying port ${portToTry + 1}...`);
        startServer(portToTry + 1);
      } else {
        console.error('Server startup error:', err);
      }
    });
  };

  startServer(PORT);
}

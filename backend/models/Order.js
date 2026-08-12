const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  productType: {
    type: String,
    default: 'card_order',
  },
  cardName: {
    type: String,
    required: true,
  },
  cardColor: {
    type: String,
    default: 'Default',
  },
  customNameOnCard: {
    type: String,
    default: '',
  },
  price: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default: 'INR',
  },
  customerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
    default: 'Paid',
  },
  paymentMethod: {
    type: String,
    enum: ['UPI', 'QR Code', 'Card / NetBanking', 'Cash on Delivery', 'Bank Transfer'],
    default: 'UPI',
  },
  transactionId: {
    type: String,
    default: '',
  },
  courierName: {
    type: String,
    default: '',
  },
  trackingNumber: {
    type: String,
    default: '',
  },
  assignedCardId: {
    type: String,
    default: '',
  },
  notes: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['created', 'pending', 'paid', 'failed', 'cancelled', 'refunded', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'created',
  },
  paymentMethod: {
    type: String,
    default: 'manual',
  },
  razorpayOrderId: {
    type: String,
    default: null,
  },
  razorpayPaymentId: {
    type: String,
    default: null,
  },
  razorpaySignature: {
    type: String,
    default: null,
  },
  failureReason: {
    type: String,
    default: '',
  },
  isReadByAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

OrderSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Order', OrderSchema);

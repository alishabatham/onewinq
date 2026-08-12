const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
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
  priceNumeric: {
    type: Number,
    default: 0,
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
    enum: ['Pending', 'Processing', 'Printed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  isReadByAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', OrderSchema);

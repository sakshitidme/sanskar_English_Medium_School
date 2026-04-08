import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
    index: true
  },
  razorpay_payment_id: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['captured', 'failed', 'refunded', 'authenticated'],
    default: 'captured'
  },
  method: {
    type: String
  },
  bank: {
    type: String
  },
  vpa: {
    type: String // UPI ID
  },
  card: {
    type: Object // For card network, last4, etc.
  },
  wallet: {
    type: String
  },
  bank_account: {
    type: String // To store bank account details if available
  },
  notes: {
    type: Object
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;

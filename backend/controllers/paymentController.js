import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import Payment from '../models/Payment.js';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create a Razorpay order
// @route   POST /api/payment/order
// @access  Public
export const createOrder = async (req, res) => {
  const { amount, currency = 'INR', receipt = 'receipt_order_74394' } = req.body;

  if (!amount) {
    return res.status(400).json({ success: false, message: 'Amount is required' });
  }

  try {
    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ success: false, message: 'Could not create order', error: error.message });
  }
};

// @desc    Verify Razorpay payment signature
// @route   POST /api/payment/verify
// @access  Public
export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, message: 'Payment details missing' });
  }

  try {
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      // 4. Fetch full payment details from Razorpay for extra security and record keeping
      const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
      
      // 5. Save to local DB as requested by user
      const newPayment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        amount: paymentDetails.amount / 100, // back to INR
        currency: paymentDetails.currency,
        status: paymentDetails.status,
        method: paymentDetails.method,
        bank: paymentDetails.bank || 'N/A',
        vpa: paymentDetails.vpa || 'N/A',
        card: paymentDetails.card || null,
        wallet: paymentDetails.wallet || 'N/A',
        bank_account: paymentDetails.bank_account ? 
          `Acc ending in ${paymentDetails.bank_account.last4}` : 'N/A',
        notes: paymentDetails.notes || {},
        name: req.body.name || 'Anonymous',
        phone: req.body.phone || 'N/A',
        email: req.body.email || 'N/A'
      });

      await newPayment.save();

      res.status(200).json({ success: true, message: 'Payment verified and saved successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
};

// @desc    Get payment details by Order ID or Payment ID
// @route   GET /api/payment/:id
// @access  Private (Admin)
export const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findOne({
      $or: [
        { razorpay_order_id: id },
        { razorpay_payment_id: id }
      ]
    });
    
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment record not found' });
    }
    res.status(200).json({ success: true, payment });
  } catch (error) {
    console.error('Error fetching payment details:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Search payments by student phone or email
// @route   POST /api/payment/search
// @access  Private (Admin)
export const getPaymentsByStudent = async (req, res) => {
  try {
    const { phone, email } = req.body;
    
    if (!phone && !email) {
      return res.status(400).json({ success: false, message: 'Phone or Email is required for search' });
    }

    const payments = await Payment.find({
      $or: [
        ...(phone ? [{ phone }] : []),
        ...(email ? [{ email }] : [])
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, payments });
  } catch (error) {
    console.error('Error searching payments:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Razorpay webhook handler
// @route   POST /api/payment/webhook
// @access  Public (Webhook)
export const handleRazorpayWebhook = async (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers['x-razorpay-signature'];
  const payload = req.body.toString(); // raw buffer to string

  // Verify signature
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(payload)
    .digest('hex');

  if (expectedSignature !== signature) {
    console.warn('Invalid Razorpay webhook signature');
    return res.status(400).json({ success: false, message: 'Invalid signature' });
  }

  let data;
  try {
    const parsed = JSON.parse(payload);
    data = parsed.payload;
    const event = parsed.event;
    // Extract entity based on event type
    let entity;
    if (event === 'payment.captured') {
      entity = data.payment?.entity;
    } else if (event === 'qr_code.credited') {
      entity = data.qr_code?.entity;
    } else {
      return res.status(200).json({ success: true, message: 'Event ignored' });
    }
    if (!entity) {
      return res.status(400).json({ success: false, message: 'No entity data' });
    }
    const paymentId = entity.id;
    const update = {
      status: entity.status,
      method: entity.method,
      amount: entity.amount ? entity.amount / 100 : undefined,
    };
    // Update payment record if exists
    await Payment.findOneAndUpdate({ razorpay_payment_id: paymentId }, update, { new: true, upsert: false });
    return res.json({ success: true, message: 'Webhook processed' });
  } catch (err) {
    console.error('Webhook handling error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
export const getPaymentStatus = async (req, res) => {
  const { orderId } = req.params;
  try {
    // Fetch payments associated with the order
    const payments = await razorpay.orders.fetchPayments(orderId);
    // Find a captured or authorized payment
    const captured = payments.items?.find(p => p.status === 'captured' || p.status === 'authorized');
    console.log(`[Polling] Order ${orderId} - Payments count: ${payments.items?.length || 0}. Status: ${captured ? captured.status : 'pending'}`);
    
    if (captured) {
      return res.json({ success: true, paid: true, paymentId: captured.id, status: captured.status });
    }
    
    // Check if any payment attempt failed
    const failed = payments.items?.find(p => p.status === 'failed');
    if (failed) {
      return res.json({ success: true, paid: false, failed: true, message: 'Payment failed' });
    }

    return res.json({ success: true, paid: false, failed: false });
  } catch (error) {
    console.error('Error fetching payment status:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

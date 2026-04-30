import express from 'express';
import { createOrder, verifyPayment, getPaymentById, getPaymentsByStudent, handleRazorpayWebhook, getPaymentStatus } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/order', createOrder);
router.post('/webhook', express.raw({ type: 'application/json' }), handleRazorpayWebhook);
router.post('/verify', verifyPayment);
router.get('/:id', getPaymentById);
router.post('/search', getPaymentsByStudent);
router.get('/status/:orderId', getPaymentStatus);


export default router;

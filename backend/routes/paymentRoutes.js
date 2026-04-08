import express from 'express';
import { createOrder, verifyPayment, getPaymentById, getPaymentsByStudent } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/order', createOrder);
router.post('/verify', verifyPayment);
router.get('/:id', getPaymentById);
router.post('/search', getPaymentsByStudent);

export default router;

import express from 'express';
import { getFees, createFee, updateFee } from '../controllers/feeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getFees)
  .post(protect, createFee);

router.route('/:id')
  .put(protect, updateFee);

export default router;

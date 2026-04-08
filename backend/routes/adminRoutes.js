import express from 'express';
import { getAdminProfile } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', protect, getAdminProfile);

export default router;

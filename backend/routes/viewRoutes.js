import express from 'express';
import { incrementViewCount, getTotalViews } from '../controllers/viewController.js';

const router = express.Router();

router.route('/')
  .get(getTotalViews)
  .post(incrementViewCount);

export default router;

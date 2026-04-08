import express from 'express';
import { loginAdmin, registerAdmin } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/register', registerAdmin); // Only use this route to setup the initial admin

export default router;

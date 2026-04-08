import express from 'express';
import { getContacts, createContact, updateContact } from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getContacts)
  .post(createContact);

router.route('/:id')
  .put(protect, updateContact);

export default router;

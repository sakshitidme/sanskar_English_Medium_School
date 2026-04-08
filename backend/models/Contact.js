import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'New', enum: ['New', 'In Progress', 'Resolved'] },
  location: { type: String } // optional if mapped to a branch
}, { timestamps: true });

export default mongoose.model('Contact', contactSchema);

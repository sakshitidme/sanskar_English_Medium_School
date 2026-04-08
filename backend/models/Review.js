import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  rating: { type: Number, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);

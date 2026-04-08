import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema({
  admissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admission', required: true },
  total_fee: { type: Number, required: true },
  paid_amount: { type: Number, default: 0 },
  pending_amount: { type: Number, required: true },
  status: { type: String, default: 'Unpaid', enum: ['Unpaid', 'Partial', 'Paid'] },
  next_due_date: { type: Date }
}, { timestamps: true });

export default mongoose.model('Fee', feeSchema);

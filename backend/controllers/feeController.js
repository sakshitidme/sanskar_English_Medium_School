import Fee from '../models/Fee.js';

// @desc    Get all fees
// @route   GET /api/fees
// @access  Private (Admin)
export const getFees = async (req, res) => {
  try {
    const fees = await Fee.find().populate('admissionId', 'student_first_name student_surname reg_no grade status').sort({ createdAt: -1 });
    res.json(fees);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a fee record
// @route   POST /api/fees
// @access  Private (Admin)
export const createFee = async (req, res) => {
  try {
    const newFee = await Fee.create(req.body);
    res.status(201).json(newFee);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

// @desc    Update fee status
// @route   PUT /api/fees/:id
// @access  Private (Admin)
export const updateFee = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);

    if (fee) {
      fee.paid_amount = req.body.paid_amount ?? fee.paid_amount;
      fee.pending_amount = req.body.pending_amount ?? fee.pending_amount;
      fee.status = req.body.status || fee.status;
      fee.next_due_date = req.body.next_due_date || fee.next_due_date;
      
      const updatedFee = await fee.save();
      res.json(updatedFee);
    } else {
      res.status(404).json({ message: 'Fee record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

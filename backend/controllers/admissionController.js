import Admission from '../models/Admission.js';

// @desc    Get all admissions
// @route   GET /api/admissions
// @access  Private (Admin)
export const getAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 });
    res.json(admissions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create an admission
// @route   POST /api/admissions
// @access  Public
export const createAdmission = async (req, res) => {
  console.log(req.body);

  const { 
    student_surname, student_first_name, student_middle_name,
    dob, phone, email, category, grade,
    form_data 
  } = req.body;

  try {
    // 1. Check for missing primary fields (Email is now optional)
    if (!student_surname || !student_first_name || !student_middle_name || !dob || !phone || !category || !grade) {
      return res.status(400).json({ message: 'All primary fields are mandatory.' });
    }

    if (!form_data) {
      return res.status(400).json({ message: 'Missing form data details.' });
    }

    const { 
      fatherSurname, fatherFirstName, fatherMiddleName, fatherEducation,
      motherSurname, motherFirstName, motherMiddleName, motherEducation,
      address, pincode
    } = form_data;

    // 2. Check for missing form_data fields
    if (!fatherSurname || !fatherFirstName || !fatherMiddleName || !fatherEducation ||
        !motherSurname || !motherFirstName || !motherMiddleName || !motherEducation ||
        !address || !pincode) {
      return res.status(400).json({ message: 'All form fields are mandatory.' });
    }

    // 3. Surname Consistency (Strict: Child, Father, Mother SAME)
    if (student_surname !== fatherSurname || student_surname !== motherSurname) {
      return res.status(400).json({ message: 'Child, Father, and Mother must ALL have the SAME surname.' });
    }

    // 4. Unique First Names (Strict: Child, Father, Mother DIFFERENT)
    if (student_first_name === fatherFirstName || student_first_name === motherFirstName || fatherFirstName === motherFirstName) {
      return res.status(400).json({ message: 'First names of Child, Father, and Mother must ALL be DIFFERENT.' });
    }

    // 5. Middle Name Rules
    // - Mother and Child can have SAME middle name
    // - BUT all three (Child, Father, Mother) must NOT have the SAME middle name
    if (student_middle_name === fatherMiddleName && student_middle_name === motherMiddleName) {
      return res.status(400).json({ message: 'All three (Child, Father, Mother) must NOT have the SAME middle name.' });
    }

    // 6. Birth Year Validation (Strict 4-digit YYYY)
    const year = dob.split('-')[0];
    if (year.length !== 4 || isNaN(year)) {
      return res.status(400).json({ message: 'Birth year must be exactly 4 digits (YYYY).' });
    }

    const newAdmission = await Admission.create(req.body);
    res.status(201).json(newAdmission);
  } catch (error) {
    console.error('Admission Creation Error:', error);
    res.status(400).json({ message: 'Validation Error or Invalid Data', error: error.message });
  }
};

// @desc    Update admission status
// @route   PUT /api/admissions/:id
// @access  Private (Admin)
export const updateAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);

    if (admission) {
      admission.status = req.body.status || admission.status;
      // Also ability to add/edit other fields if necessary
      
      const updatedAdmission = await admission.save();
      res.json(updatedAdmission);
    } else {
      res.status(404).json({ message: 'Admission not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

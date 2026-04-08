import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema({
  reg_no: { type: String }, // Can be assigned later
  student_first_name: { type: String, required: true },
  student_middle_name: { type: String },
  student_surname: { type: String, required: true },
  dob: { type: String, required: true },
  category: { type: String, required: true },
  grade: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String }, // Optional
  status: { type: String, default: 'pending', enum: ['pending', 'approved', 'rejected'] },
  transactionId: { type: String },

  form_data: {
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    fatherFirstName: { type: String, required: true },
    fatherSurname: { type: String, required: true },
    fatherEducation: { type: String, required: true },
    fatherMiddleName: { type: String, required: true },
    motherFirstName: { type: String, required: true },
    motherSurname: { type: String, required: true },
    motherEducation: { type: String, required: true },
    motherMiddleName: { type: String, required: true },
    
    // Cloudinary or other hosted URLs
    childPhotoUrl: { type: String, required: true },
    fatherPhotoUrl: { type: String, required: true },
    motherPhotoUrl: String,
    fatherSignatureUrl: { type: String }, // Optional
    motherSignatureUrl: { type: String } // Optional
  }
}, { timestamps: true });

export default mongoose.model('Admission', admissionSchema);

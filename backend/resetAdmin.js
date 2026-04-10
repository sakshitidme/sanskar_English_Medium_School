import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
    
    const email = 'bkgroupofeducation@gmail.com';
    const password = 'bksanskar@2026';

    // Delete ALL existing admins to avoid confusion
    await Admin.deleteMany({});
    console.log('Deleted all existing admin accounts.');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await Admin.create({
      email,
      password: hashedPassword
    });

    console.log(`Final Admin user created successfully!`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error resetting admin:', error);
    process.exit(1);
  }
};

resetAdmin();

import mongoose from 'mongoose';
import { MONGODB_URI } from '../config/config.js';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('DB is connected');
  } catch (error) {
    console.log('DB connection error', error);
    process.exit(1);
  }
};

export default connectDB;

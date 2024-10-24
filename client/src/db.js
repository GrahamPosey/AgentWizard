// db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Replace process.env.MONGO_URI with your actual connection string
    const conn = await mongoose.connect('mongodb://localhost:27017/mydatabase');

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;

// db.js
import mongoose from 'mongoose';

const connectDB = async () => {
      await mongoose.connect('mongodb://localhost:27017/AgentDb').then(() => {
      console.log('MongoDB connected');
    }).catch((err) => {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    });  
};

export default connectDB;

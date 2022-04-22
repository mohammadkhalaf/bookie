import mongoose from 'mongoose';

const connectDB = async () => {
  return await mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('is connected to db');
  });
};
export default connectDB;

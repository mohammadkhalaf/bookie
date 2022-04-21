import mongoose from 'mongoose';

const connectDB = (url) => {
  return mongoose.connect(url).then(() => {
    console.log('is connected to db');
  });
};
export default connectDB;

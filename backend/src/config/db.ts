import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {

  try {

    await mongoose.connect(process.env.MONGO_URL || '');

    console.log('Database is online');

  } catch (error) {
    console.log('Something is wrong');
    console.log(error);
    process.exit(1);
  }
}

export default connectDB

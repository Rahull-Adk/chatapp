import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      "Mongo Database connected successfully:",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log(`Mongo Database connection failed`, error);
  }
};

export default connectDB;

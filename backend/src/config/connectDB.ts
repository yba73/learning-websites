import mongoose, { ConnectOptions } from "mongoose";
require("dotenv").config();

mongoose.set("strictQuery", true);

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      bufferCommands: false,
    });
    console.log("data base connected successfully");
  } catch (error) {
    throw new Error(`error to connect to database is ${error}`);
  }
};

export default connectDB;

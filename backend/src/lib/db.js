import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log(`MongoDB connected`);
  } catch (error) {
    console.log(`Error connecting to DB :  ${error.message}`);
    process.exit(1);
  }
};

import mongoose from "mongoose";

export default async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error", error);
  }
}

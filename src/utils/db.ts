import mongoose from "mongoose";

const connectDb = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI as string, {
      dbName: "blog",
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectDb;

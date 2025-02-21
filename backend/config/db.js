import mongoose from "mongoose";

import "dotenv/config";

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("mongodb connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connect;
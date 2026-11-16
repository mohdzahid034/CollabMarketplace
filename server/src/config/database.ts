import mongoose from "mongoose";
import env from "./env.js";
import logger from "./logger.js";

const connectDB = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(env.MONGODB_URI);

    logger.info(
      { host: connection.connection.host },
      "MongoDB connected successfully"
    );
  } catch (error) {
    logger.fatal({ err: error }, "MongoDB connection failed");
    process.exit(1);
  }
};

export default connectDB;
import "dotenv/config";
import logger from "./config/logger.js";
import app from "./app.js";
import connectDB from "./config/database.js";
import env from "./config/env.js";


const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      logger.info(
        { port: env.PORT },
        "Server started successfully"
      );
    });
  } catch (error) {
    logger.fatal({ err: error }, "Server startup failed");
    process.exit(1);
  }
};

startServer();
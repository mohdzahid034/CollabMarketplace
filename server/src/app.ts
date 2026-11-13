
import express from "express";
import AppError from "./utils/AppError.js";
import errorHandler from "./middleware/errorHandler.js";
import catchAsync from "./utils/catchAsync.js";

const app = express();

// Global middleware
app.use(express.json());

app.get(
  "/api/test-error",
  catchAsync(async (req, res) => {
    throw new AppError("This is a test error", 400);
  })
);

app.get(
  "/api/test-unknown-error",
  catchAsync(async (req, res) => {
    throw new Error("Database password leaked");
  })
);

// Health-check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CollabMarketplace API is running"
  });
});
app.post("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    receivedData: req.body
  });
});
app.use(errorHandler);
export default app;

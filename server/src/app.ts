
import express from "express";

const app = express();

// Global middleware
app.use(express.json());

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

export default app;

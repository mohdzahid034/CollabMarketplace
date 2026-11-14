console.log("LOADED: src/app.ts");
import express from "express";
import AppError from "./utils/AppError.js";
import errorHandler from "./middleware/errorHandler.js";
import catchAsync from "./utils/catchAsync.js";
import validate from "./middleware/validate.js";
import testValidation from "./validations/testValidation.js";
import ApiResponse from "./utils/ApiResponse.js";
const app = express();
app.get("/debug", (req, res) => {
  res.send("DEBUG ROUTE WORKING");
});
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
  res.status(200).json(
    new ApiResponse(
      "Data received successfully",
      req.body
    )
  );
});
app.post(
  "/api/test-validation",
  validate(testValidation),
  (req, res) => {
    res.status(200).json(
      new ApiResponse(
        "Data validated successfully",
        req.body
      )
    );
  }
);
console.log("Registered routes:", app.router.stack
  .filter((layer: any) => layer.route)
  .map((layer: any) => ({
    path: layer.route.path,
    methods: layer.route.methods
  }))
);
app.use(errorHandler);
export default app;

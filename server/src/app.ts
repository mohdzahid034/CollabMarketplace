console.log("LOADED: src/app.ts");
import express from "express";
import AppError from "./utils/AppError.js";
import errorHandler from "./middleware/errorHandler.js";
import catchAsync from "./utils/catchAsync.js";
import validate from "./middleware/validate.js";
import testValidation from "./validations/testValidation.js";
import ApiResponse from "./utils/ApiResponse.js";
import { pinoHttp } from "pino-http";
import { randomUUID } from "node:crypto";
import logger from "./config/logger.js";

const app = express();

// Request logging and tracking
app.use(
  pinoHttp({
    logger,
    genReqId: () => String(randomUUID()),
    customProps: (req) => ({
      requestId: req.id
    }),

    customAttributeKeys: {
      reqId: "requestId"
    },

    customSuccessMessage: () => "Request completed",

    customErrorMessage: () => "Request failed",

    customLogLevel: (req, res, err) => {
      if (res.statusCode >= 500 || err) return "error";
      if (res.statusCode >= 400) return "warn";
      return "info";
    }
  })
);
app.use((req, res, next) => {
  res.setHeader("X-Request-Id", String(req.id));
  next();
});

// Request body parsing
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
app.use(errorHandler);
export default app;

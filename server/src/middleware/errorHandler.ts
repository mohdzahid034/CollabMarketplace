import type {
  Request,
  Response,
  NextFunction
} from "express";

import AppError from "../utils/AppError.js";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.headersSent) {
    next(err);
    return;
  }

  const isOperational = err instanceof AppError;

  const statusCode = isOperational
    ? err.statusCode
    : 500;

  const message = isOperational
    ? err.message
    : "Internal Server Error";

  console.error(err);

  res.status(statusCode).json({
    success: false,
    message,
    data: null
  });
};

export default errorHandler;
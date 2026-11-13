import type {
  Request,
  Response,
  NextFunction
} from "express";

import type Joi from "joi";
import AppError from "../utils/AppError.js";

const validate = (schema: Joi.ObjectSchema) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      convert: true
    });

    if (error) {
      const message = error.details
        .map((detail) => detail.message)
        .join(", ");

      return next(new AppError(message, 400));
    }

    req.body = value;
    next();
  };
};

export default validate;
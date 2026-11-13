import type {
  Request,
  Response,
  NextFunction
} from "express";

const catchAsync = (
  fn: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<unknown>
) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    Promise.resolve()
      .then(() => fn(req, res, next))
      .catch(next);
  };
};

export default catchAsync;
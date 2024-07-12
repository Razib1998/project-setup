import { NextFunction, Request, RequestHandler, Response } from "express";

//  Higher order functions to avoid repeating try catch method.
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;

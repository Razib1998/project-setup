import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import { AnyZodObject } from "zod";
import { studentValidations } from "../student/student.validation.zod";

const router = express.Router();

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (err) {
      next(err);
    }
  };
};

router.post(
  "/create-student",
  validateRequest(studentValidations.studentValidationZodSchema),
  UserControllers.createStudent
);

export const UserRoutes = router;

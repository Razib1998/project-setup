import express from "express";
import { UserControllers } from "./user.controller";

import { studentValidations } from "../student/student.validation.zod";
import { validateRequest } from "../../middlwares/validateRequest";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent
);

export const UserRoutes = router;

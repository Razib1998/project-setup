import express from "express";
import { UserControllers } from "./user.controller";

import { studentValidations } from "../student/student.validation.zod";
import { validateRequest } from "../../middlwares/validateRequest";
import { createFacultyValidationSchema } from "../Faculty/faculty.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent
);
router.post(
  "/create-faculty",
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty
);
router.get("/", UserControllers.getSingleUser);

router.get("/:userId", UserControllers.getSingleUser);

export const UserRoutes = router;

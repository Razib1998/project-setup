import express from "express";
import { UserControllers } from "./user.controller";

import { studentValidations } from "../student/student.validation.zod";
import { validateRequest } from "../../middlwares/validateRequest";
import { createFacultyValidationSchema } from "../Faculty/faculty.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";
import { auth } from "../Auth/auth";
import { USER_ROlE } from "./user.constant";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROlE.admin),
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent
);
router.post(
  "/create-faculty",
  auth(USER_ROlE.admin),
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty
);
router.post(
  "/create-admin",
  auth(USER_ROlE.admin),
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin
);

router.get("/me", UserControllers.getMe);

export const UserRoutes = router;

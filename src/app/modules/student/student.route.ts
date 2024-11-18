import express from "express";
import { StudentControllers } from "./student.controller";
import { validateRequest } from "../../middlwares/validateRequest";
import { updateStudentValidationSchema } from "./student.validation.zod";
import { USER_ROlE } from "../user/user.constant";
import { auth } from "../Auth/auth";

const router = express.Router();

// This function will call the controller..
router.get(
  "/",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin),
  StudentControllers.getAllStudents
);
router.get(
  "/:id",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin, USER_ROlE.faculty),
  StudentControllers.getSingleStudent
);
router.patch(
  "/:id",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin),
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent
);
router.delete(
  "/:id",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin),
  StudentControllers.deleteStudent
);

export const StudentRoutes = router;

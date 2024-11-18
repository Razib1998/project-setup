import express from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import { validateRequest } from "../../middlwares/validateRequest";
import { academicSemesterValidations } from "./academicSemester.validation";
import { auth } from "../Auth/auth";
import { USER_ROlE } from "../user/user.constant";

const router = express.Router();

// This function will call the controller..
router.post(
  "/create-academic-semester",
  auth(USER_ROlE.superAdmin, USER_ROlE.admin),
  validateRequest(
    academicSemesterValidations.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.createAcademicSemester
);
router.patch(
  "/semesterId",
  validateRequest(
    academicSemesterValidations.updateAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.updateAcademicSemester
);
router.get(
  "/",
  auth("admin", "superAdmin"),
  AcademicSemesterControllers.getAllSemesters
);
router.get("/:semesterId", AcademicSemesterControllers.getSemesterById);

export const AcademicSemesterRoutes = router;

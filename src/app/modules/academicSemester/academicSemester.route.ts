import express from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import { validateRequest } from "../../middlwares/validateRequest";
import { academicSemesterValidations } from "./academicSemester.validation";
import { auth } from "../Auth/auth";

const router = express.Router();

// This function will call the controller..
router.post(
  "/create-academic-semester",
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
router.get("/", auth("admin"), AcademicSemesterControllers.getAllSemesters);
router.get("/:semesterId", AcademicSemesterControllers.getSemesterById);

export const AcademicSemesterRoutes = router;

import express from "express";
import { validateRequest } from "../../middlwares/validateRequest";
import { AcademicFacultyControllers } from "./academicFaculty.controllers";
import { AcademicFacultyValidation } from "./academicFaculty.validation";

const router = express.Router();

router.post(
  "/create-faculty",
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.createAcademicFaculty
);
router.get("/", AcademicFacultyControllers.getAllAcademicFaculty);

router.get("/:facultyId", AcademicFacultyControllers.getSingleAcademicFaculty);
router.patch(
  "/:facultyId",
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.updateAcademicFaculty
);

export const AcademicFacultyRoutes = router;

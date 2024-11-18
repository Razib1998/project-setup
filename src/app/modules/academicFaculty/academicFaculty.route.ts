import express from "express";
import { validateRequest } from "../../middlwares/validateRequest";
import { AcademicFacultyControllers } from "./academicFaculty.controllers";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { auth } from "../Auth/auth";
import { USER_ROlE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-faculty",
  auth(USER_ROlE.superAdmin, USER_ROlE.admin),
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.createAcademicFaculty
);
router.get("/", AcademicFacultyControllers.getAllAcademicFaculty);

router.get("/:id", AcademicFacultyControllers.getSingleAcademicFaculty);
router.patch(
  "/:id",
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.updateAcademicFaculty
);

export const AcademicFacultyRoutes = router;

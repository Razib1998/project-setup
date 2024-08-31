import express from "express";
import { validateRequest } from "../../middlwares/validateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";

const router = express.Router();

router.post(
  "/create-academic-department",
  // validateRequest(
  //   AcademicDepartmentValidation.createAcademicDepartmentValidationSchema
  // ),
  AcademicDepartmentControllers.createAcademicDepartment
);
router.get("/", AcademicDepartmentControllers.getAllAcademicDepartments);

router.get("/:id", AcademicDepartmentControllers.getSingleAcademicDepartment);
router.patch(
  "/:id",
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.updateAcademicDepartment
);

export const AcademicDepartmentRoutes = router;

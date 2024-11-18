import express from "express";
import { validateRequest } from "../../middlwares/validateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";
import { auth } from "../Auth/auth";
import { USER_ROlE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-academic-department",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin),
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.createAcademicDepartment
);
router.get(
  "/",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin),
  AcademicDepartmentControllers.getAllAcademicDepartments
);

router.get("/:id", AcademicDepartmentControllers.getSingleAcademicDepartment);
router.patch(
  "/:id",
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.updateAcademicDepartment
);

export const AcademicDepartmentRoutes = router;

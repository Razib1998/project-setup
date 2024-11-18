import express from "express";
import { validateRequest } from "../../middlwares/validateRequest";
import { FacultyControllers } from "./faculty.controller";
import { updateFacultyValidationSchema } from "./faculty.validation";
import { auth } from "../Auth/auth";
import { USER_ROlE } from "../user/user.constant";

const router = express.Router();

// This function will call the controller..

router.get(
  "/",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin),
  FacultyControllers.getAllFaculties
);
router.get(
  "/:id",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin),
  FacultyControllers.getSingleFaculty
);
router.patch(
  "/:id",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin),
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty
);
router.delete(
  "/:id",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin),
  FacultyControllers.deleteFaculty
);

export const FacultyRoutes = router;

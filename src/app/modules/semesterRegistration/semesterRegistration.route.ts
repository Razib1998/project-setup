import express from "express";
import { validateRequest } from "../../middlwares/validateRequest";
import { SemesterRegistrationValidations } from "./semesterRegistration.validation";
import { SemesterRegistrationControllers } from "./semesterRegistration.controller";
import { auth } from "../Auth/auth";
import { USER_ROlE } from "../user/user.constant";

const router = express.Router();

// This function will call the controller..
router.post(
  "/create-semester-registration",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin),
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationControllers.createSemesterRegistration
);

router.get(
  "/",
  auth(
    USER_ROlE.admin,
    USER_ROlE.superAdmin,
    USER_ROlE.faculty,
    USER_ROlE.superAdmin
  ),
  SemesterRegistrationControllers.getAllSemesterRegistration
);
router.get(
  "/:id",
  auth(
    USER_ROlE.admin,
    USER_ROlE.superAdmin,
    USER_ROlE.faculty,
    USER_ROlE.superAdmin
  ),
  SemesterRegistrationControllers.getSingleSemesterRegistration
);
router.patch(
  "/:id",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin),
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationControllers.updateSemesterRegistration
);

router.delete(
  "/:id",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin),
  SemesterRegistrationControllers.deleteSemesterRegistration
);

export const SemesterRegistrationRoutes = router;

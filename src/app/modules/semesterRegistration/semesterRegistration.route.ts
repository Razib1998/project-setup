import express from "express";
import { validateRequest } from "../../middlwares/validateRequest";
import { SemesterRegistrationValidations } from "./semesterRegistration.validation";
import { SemesterRegistrationControllers } from "./semesterRegistration.controller";

const router = express.Router();

// This function will call the controller..
router.post(
  "/create-semester-registration",
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationControllers.createSemesterRegistration
);

router.get("/", SemesterRegistrationControllers.getAllSemesterRegistration);
router.get(
  "/:id",
  SemesterRegistrationControllers.getSingleSemesterRegistration
);

export const SemesterRegistrationRoutes = router;

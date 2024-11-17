import express from "express";
import { EnrolledCourseController } from "./enrolledCourse.controller";
import { validateRequest } from "../../middlwares/validateRequest";
import { EnrolledCourseValidation } from "./enrolledCourse.validation";
import { auth } from "../Auth/auth";

const router = express.Router();

router.post(
  "/create-enrolled-course",
  auth("student"),
  validateRequest(
    EnrolledCourseValidation.createEnrolledCourseValidationSchema
  ),
  EnrolledCourseController.createEnrolledCourse
);

router.patch(
  "/update-enrolled-course-marks",
  auth("faculty"),
  validateRequest(
    EnrolledCourseValidation.updateEnrolledCourseMarksValidationZodSchema
  ),
  EnrolledCourseController.updateEnrolledCourseMarks
);

export const EnrolledCourseRoutes = router;

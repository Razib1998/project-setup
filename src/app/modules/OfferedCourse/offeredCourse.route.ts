import { validateRequest } from "../../middlwares/validateRequest";
import express from "express";
import { OfferedCourseControllers } from "./offeredCourse.controller";
import { OfferedCourseValidations } from "./offeredCourse.validation";

const router = express.Router();

router.post(
  "/create-offered-course",
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse
);

export const OfferedCourseRoutes = router;

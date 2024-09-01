import express from "express";
import { validateRequest } from "../../middlwares/validateRequest";
import { CourseValidation } from "./course.validation";
import { CourseControllers } from "./course.controller";

const router = express.Router();

router.post(
  "/create-course",
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse
);
router.get("/", CourseControllers.getAllCourses);

router.get("/:id", CourseControllers.getSingleCourse);
router.delete("/:id", CourseControllers.deleteCourse);

router.patch(
  "/:id",
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourse
);
router.put(
  "/:courseId/assign-faculties",
  validateRequest(CourseValidation.assignFacultyWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourseIntoDB
);
router.delete(
  "/:courseId/remove-faculties",
  validateRequest(CourseValidation.assignFacultyWithCourseValidationSchema),
  CourseControllers.removeFacultiesWithCourseFromDB
);

export const CourseRoutes = router;

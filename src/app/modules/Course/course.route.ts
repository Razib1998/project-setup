import express from "express";
import { validateRequest } from "../../middlwares/validateRequest";
import { CourseValidation } from "./course.validation";
import { CourseControllers } from "./course.controller";
import { auth } from "../Auth/auth";
import { USER_ROlE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-course",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin),
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse
);
router.get(
  "/",
  auth(
    USER_ROlE.admin,
    USER_ROlE.superAdmin,
    USER_ROlE.faculty,
    USER_ROlE.student
  ),
  CourseControllers.getAllCourses
);

router.get(
  "/:id",
  auth(
    USER_ROlE.admin,
    USER_ROlE.superAdmin,
    USER_ROlE.faculty,
    USER_ROlE.student
  ),
  CourseControllers.getSingleCourse
);
router.delete(
  "/:id",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin),
  CourseControllers.deleteCourse
);

router.patch(
  "/:id",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin),
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourse
);
router.put(
  "/:courseId/assign-faculties",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin),
  validateRequest(CourseValidation.assignFacultyWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourseIntoDB
);
router.get(
  "/:courseId/get-faculties",
  auth(USER_ROlE.admin, USER_ROlE.faculty, USER_ROlE.student),
  CourseControllers.getFacultiesWithCourse
);

router.delete(
  "/:courseId/remove-faculties",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin),
  validateRequest(CourseValidation.assignFacultyWithCourseValidationSchema),
  CourseControllers.removeFacultiesWithCourseFromDB
);

export const CourseRoutes = router;

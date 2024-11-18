import { validateRequest } from "../../middlwares/validateRequest";
import express from "express";
import { OfferedCourseControllers } from "./offeredCourse.controller";
import { OfferedCourseValidations } from "./offeredCourse.validation";
import { auth } from "../Auth/auth";
import { USER_ROlE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-offered-course",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin, USER_ROlE.faculty),
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse
);
router.get(
  "/",
  auth(
    USER_ROlE.admin,
    USER_ROlE.superAdmin,
    USER_ROlE.faculty,
    USER_ROlE.student
  ),
  OfferedCourseControllers.getAllOfferedCourses
);
router.get(
  "/:id",
  auth(
    USER_ROlE.admin,
    USER_ROlE.superAdmin,
    USER_ROlE.faculty,
    USER_ROlE.student
  ),
  OfferedCourseControllers.getSingleOfferedCourse
);
router.patch(
  "/:id",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin, USER_ROlE.faculty),
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse
);

router.delete(
  "/:id",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin, USER_ROlE.faculty),
  OfferedCourseControllers.deleteOfferedCourse
);

export const OfferedCourseRoutes = router;

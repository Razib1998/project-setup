import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";

import { studentValidations } from "../student/student.validation.zod";
import { validateRequest } from "../../middlwares/validateRequest";
import { createFacultyValidationSchema } from "../Faculty/faculty.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";
import { auth } from "../Auth/auth";
import { USER_ROlE } from "./user.constant";
import { UserValidation } from "./user.validation";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin),
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent
);
router.post(
  "/create-faculty",
  auth(USER_ROlE.admin, USER_ROlE.superAdmin),
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty
);
router.post(
  "/create-admin",
  auth(USER_ROlE.superAdmin),
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin
);
router.post(
  "/change-status/:id",
  auth(USER_ROlE.admin),
  validateRequest(UserValidation.userStatusChangeValidationSchema),
  UserControllers.changeStatus
);

router.get("/me", auth("student", "faculty", "admin"), UserControllers.getMe);

export const UserRoutes = router;

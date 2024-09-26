import { validateRequest } from "../../middlwares/validateRequest";
import express from "express";
import { AuthValidation } from "./auth.validation";
import { AuthUserControllers } from "./auth.controller";
import { auth } from "./auth";
import { USER_ROlE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginUserValidationSchema),
  AuthUserControllers.loginUser
);
router.post(
  "/change-password",
  auth(USER_ROlE.admin, USER_ROlE.faculty, USER_ROlE.student),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthUserControllers.changePassword
);
router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthUserControllers.refreshToken
);

export const AuthRoutes = router;

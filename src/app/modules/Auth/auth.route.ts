import { validateRequest } from "../../middlwares/validateRequest";
import express from "express";
import { AuthValidation } from "./auth.validation";
import { AuthUserControllers } from "./auth.controller";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginUserValidationSchema),
  AuthUserControllers.loginUser
);

export const AuthRoutes = router;

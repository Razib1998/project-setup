import express from "express";
import { validateRequest } from "../../middlwares/validateRequest";
import { AdminControllers } from "./admin.controller";
import { updateAdminValidationSchema } from "./admin.validation";
import { USER_ROlE } from "../user/user.constant";
import { auth } from "../Auth/auth";

const router = express.Router();

// This function will call the controller..
router.get("/", auth(USER_ROlE.superAdmin), AdminControllers.getAllAdmins);
router.get("/:id", auth(USER_ROlE.superAdmin), AdminControllers.getSingleAdmin);
router.patch(
  "/:id",
  auth(USER_ROlE.superAdmin),
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin
);
router.delete("/:id", auth(USER_ROlE.superAdmin), AdminControllers.deleteAdmin);

export const AdminRoutes = router;

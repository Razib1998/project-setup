import express from "express";
import { validateRequest } from "../../middlwares/validateRequest";
import { AdminControllers } from "./admin.controller";
import { updateAdminValidationSchema } from "./admin.validation";

const router = express.Router();

// This function will call the controller..
router.get("/", AdminControllers.getAllAdmins);
router.get("/:adminId", AdminControllers.getSingleAdmin);
router.patch(
  "/:adminId",
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin
);
router.delete("/:adminId", AdminControllers.deleteAdmin);

export const AdminRoutes = router;

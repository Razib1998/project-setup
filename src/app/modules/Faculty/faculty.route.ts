import express from "express";
import { validateRequest } from "../../middlwares/validateRequest";
import { FacultyControllers } from "./faculty.controller";
import { updateFacultyValidationSchema } from "./faculty.validation";

const router = express.Router();

// This function will call the controller..
router.get("/", FacultyControllers.getAllFaculties);
router.get("/:facultyId", FacultyControllers.getSingleFaculty);
router.patch(
  "/:facultyId",
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty
);
router.delete("/:facultyId", FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;

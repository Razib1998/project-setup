import express from "express";
import { StudentControllers } from "./student.controller";
import { validateRequest } from "../../middlwares/validateRequest";
import { updateStudentValidationSchema } from "./student.validation.zod";

const router = express.Router();

// This function will call the controller..
router.get("/", StudentControllers.getAllStudents);
router.get("/:studentId", StudentControllers.getSingleStudent);
router.patch(
  "/:studentId",
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent
);
router.delete("/:studentId", StudentControllers.deleteStudent);

export const StudentRoutes = router;

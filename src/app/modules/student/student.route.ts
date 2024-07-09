import express from "express";
import { StudentControllers } from "./student.controller";

const router = express.Router();

// This function will call the controller..
router.get("/", StudentControllers.getAllStudents);
router.get("/:studentId", StudentControllers.getSingleStudent);

export const StudentRoutes = router;

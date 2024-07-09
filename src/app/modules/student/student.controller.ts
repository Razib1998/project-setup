import { NextFunction, Request, Response } from "express";
import { studentService } from "./student.service";

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await studentService.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Students are retrieved Successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await studentService.getSingleStudent(studentId);
    res.status(200).json({
      success: true,
      message: "Student is retrieved Successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
};

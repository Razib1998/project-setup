import { Request, Response } from "express";
import { studentService } from "./student.service";
import Joi from "joi";
import studentValidationSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating Validation using joi..

    // Define the Joi schema for the nested objects first

    const { student: studentData } = req.body;

    const { error } = studentValidationSchema.validate(studentData);
    const result = await studentService.createStudentIntoDB(studentData);

    if (error) {
      res.status(500).json({
        success: false,
        message: "Something went Wrong!",
        error: error.details,
      });
    }

    res.status(200).json({
      success: true,
      message: "Student Created Successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went Wrong!",
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentService.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Students are retrieved Successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentService.getSingleStudent(studentId);
    res.status(200).json({
      success: true,
      message: "Student is retrieved Successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};

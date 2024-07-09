import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = req.body;
    // const zodParseData = studentValidationZodSchema.parse(studentData);
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );
    res.status(200).json({
      success: true,
      message: "Student Created Successfully!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
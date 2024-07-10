import { RequestHandler } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/senResponse";
import httpStatus from "http-status";

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;
    // const zodParseData = studentValidationZodSchema.parse(studentData);
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );
    // res.status(200).json({
    //   success: true,
    //   message: "Student Created Successfully!",
    //   data: result,
    // });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student Created Successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};

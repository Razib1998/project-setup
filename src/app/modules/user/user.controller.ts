import { RequestHandler } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/senResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student Created Successfully",
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};

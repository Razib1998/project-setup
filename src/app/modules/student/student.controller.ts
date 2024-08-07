import { RequestHandler } from "express";
import { studentService } from "./student.service";
import sendResponse from "../../utils/senResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllStudents: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await studentService.getAllStudentsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students are retrieved Successfully!",
    data: result,
  });
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSingleStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentService.getSingleStudent(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students is retrieved Successfully!",
    data: result,
  });
});
export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
};

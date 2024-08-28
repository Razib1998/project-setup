import { RequestHandler } from "express";
import { studentServices } from "./student.service";
import sendResponse from "../../utils/senResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllStudents: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await studentServices.getAllStudentsFromDB();
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
  const result = await studentServices.getSingleStudent(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students is retrieved Successfully!",
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await studentServices.updateStudentIntoDB(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is updated succesfully",
    data: result,
  });
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const deleteStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentServices.deleteStudent(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student deleted Successfully!",
    data: result,
  });
});
export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};

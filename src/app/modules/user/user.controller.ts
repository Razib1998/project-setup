/* eslint-disable @typescript-eslint/no-unused-vars */
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
const createFaculty: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, faculty: facultyData } = req.body;
  const result = await UserServices.createFacultyIntoDB(password, facultyData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty Created Successfully",
    data: result,
  });
});
const getAllUsers: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await UserServices.getAllUsersFromDB;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All users are Retrieved Successfully",
    data: result,
  });
});
const getSingleUser: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await UserServices.getSingUserFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "single user retrieved Successfully",
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  getAllUsers,
  getSingleUser,
};

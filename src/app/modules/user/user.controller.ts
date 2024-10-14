/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/senResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { get } from "http";
import AppError from "../../errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;
  const result = await UserServices.createStudentIntoDB(
    req.file,
    password,
    studentData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student Created Successfully",
    data: result,
  });
});
const createFaculty: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, faculty: facultyData } = req.body;
  const result = await UserServices.createFacultyIntoDB(
    req.file,
    password,
    facultyData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty Created Successfully",
    data: result,
  });
});
const createAdmin: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, admin: adminData } = req.body;
  const result = await UserServices.createAdminIntoDB(
    req.file,
    password,
    adminData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Created Successfully",
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
const getMe: RequestHandler = catchAsync(async (req, res, next) => {
  const token = (req.headers.authorization as string).split(" ")[1];
  if (!token) {
    throw new AppError(httpStatus.NOT_FOUND, "You are not Authorized");
  }
  const result = await UserServices.getMe(token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user is Retrieved Successfully",
    data: result,
  });
});
const changeStatus: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await UserServices.changeStatus(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User status updated Successfully",
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getAllUsers,
  getMe,
  changeStatus,
};

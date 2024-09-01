/* eslint-disable @typescript-eslint/no-unused-vars */

import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/senResponse";
import { CourseServices } from "./course.service";
import httpStatus from "http-status";

const createCourse: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course Created Successfully",
    data: result,
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllCourses: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await CourseServices.getAllCourseFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Courses are retrieved Successfully!",
    data: result,
  });
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSingleCourse: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is retrieved Successfully!",
    data: result,
  });
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateCourse: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseFromDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "update updated Successfully!",
    data: result,
  });
});

const deleteCourse: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course  is deleted Successfully!",
    data: result,
  });
});

const assignFacultiesWithCourseIntoDB: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.assignFacultiesWithCourseIntoDB(
      courseId,
      faculties
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Faculty assign Successfully!",
      data: result,
    });
  }
);
const removeFacultiesWithCourseFromDB: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
    const result = await CourseServices.removeFacultiesWithCourseFromDB(
      courseId,
      faculties
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Faculty removed Successfully!",
      data: result,
    });
  }
);

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesWithCourseFromDB,
};

import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/senResponse";
import { OfferedCorseServices } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCorseServices.createOfferedCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered Course created Successfully",
    data: result,
  });
});
const getAllOfferedCourses = catchAsync(async (req, res) => {
  const result = await OfferedCorseServices.getAllOfferedCourseFromDB(
    req.query
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered Course are retrieved Successfully",
    meta: result.meta,
    data: result.result,
  });
});
const getMyOfferedCourses = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await OfferedCorseServices.getMyOfferedCoursesFromDB(
    userId,
    req.query
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OfferedCourses retrieved successfully !",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCorseServices.getSingleOfferedCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered Course is retrieved Successfully",
    data: result,
  });
});
const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCorseServices.updateOfferedCourseIntoDB(
    id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered Course is updated Successfully",
    data: result,
  });
});

const deleteOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCorseServices.deleteOfferedCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered Course is deleted Successfully",
    data: result,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourses,
  getMyOfferedCourses,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
};

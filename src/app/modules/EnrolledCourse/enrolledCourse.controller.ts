import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/senResponse";
import { EnrolledCourseServices } from "./enrolledCourse.service";

const createEnrolledCourse = catchAsync(async (req, res) => {
  console.log(req.user);
  const userId = req.user.userId;
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    userId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is enrolled successfully",
    data: null,
  });
});

export const EnrolledCourseController = {
  createEnrolledCourse,
};

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

export const OfferedCourseControllers = {
  createOfferedCourse,
};

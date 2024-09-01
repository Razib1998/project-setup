import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/senResponse";
import { SemesterRegistration } from "./semesterRegistration.model";

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result = await SemesterRegistration.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester registered Successfully",
    data: result,
  });
});

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
};

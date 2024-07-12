import sendResponse from "../../utils/senResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createSemesterIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester is Created Successfully",
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
};

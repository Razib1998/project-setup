import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/senResponse";
import { SemesterRegistrationService } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationService.createSemesterRegistrationIntoDB(
      req.body
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester registered Successfully",
    data: result,
  });
});
const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationService.getAllSemesterRegistrationsFromDB(
      req.query
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester registration are retrieved Successfully",
    data: result,
  });
});
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationService.getSingleSemesterRegistrationsFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester registration is retrieved Successfully",
    data: result,
  });
});
const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationService.updateSemesterRegistrationIntoDB(
      id,
      req.body
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester registration is updated Successfully",
    data: result,
  });
});

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};

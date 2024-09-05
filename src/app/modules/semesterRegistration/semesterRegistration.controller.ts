import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/senResponse";
import { SemesterRegistration } from "./semesterRegistration.model";
import { SemesterRegistrationServices } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result = await SemesterRegistration.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester registered Successfully",
    data: result,
  });
});
const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getAllSemesterRegistrationsFromDB(
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
    await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester registration is retrieved Successfully",
    data: result,
  });
});
// const updateSemesterRegistration = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result =
//     await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(
//       id,
//       req.body
//     );
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Semester registration is updated Successfully",
//     data: result,
//   });
// });

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
};

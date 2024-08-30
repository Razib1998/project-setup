import { RequestHandler } from "express";
import sendResponse from "../../utils/senResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { facultyServices } from "./faculty.service";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllFaculties: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await facultyServices.getAllFacultiesFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculties are retrieved Successfully!",
    data: result,
  });
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSingleFaculty: RequestHandler = catchAsync(async (req, res, next) => {
  const { facultyId } = req.params;
  const result = await facultyServices.getSingleFaculty(facultyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is retrieved Successfully!",
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const { faculty } = req.body;
  const result = await facultyServices.updateFacultyIntoDB(facultyId, faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is updated successfully",
    data: result,
  });
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const deleteFaculty: RequestHandler = catchAsync(async (req, res, next) => {
  const { facultyId } = req.params;
  const result = await facultyServices.deleteFaculty(facultyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty deleted Successfully!",
    data: result,
  });
});
export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};

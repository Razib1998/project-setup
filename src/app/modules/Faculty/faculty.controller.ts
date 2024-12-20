import sendResponse from "../../utils/senResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { facultyServices } from "./faculty.service";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllFaculties = catchAsync(async (req, res, next) => {
  const result = await facultyServices.getAllFacultiesFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculties are retrieved Successfully!",
    meta: result.meta,
    data: result.result,
  });
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSingleFaculty = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await facultyServices.getSingleFaculty(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is retrieved Successfully!",
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await facultyServices.updateFacultyIntoDB(id, faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is updated successfully",
    data: result,
  });
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const deleteFaculty = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await facultyServices.deleteFaculty(id);
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

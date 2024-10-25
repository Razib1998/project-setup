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
const getAllSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllSemesters(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All semester find  Successfully",
    meta: result.meta,
    data: result.result,
  });
});
const getSemesterById = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSemesterServices.getSemesterById(semesterId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Find a single semester using id+q3 Successfully",
    data: result,
  });
});
const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const studentData = req.body;
  const result = await AcademicSemesterServices.updateAcademicSemester(
    semesterId,
    studentData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester updated Successfully",
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllSemesters,
  getSemesterById,
  updateAcademicSemester,
};

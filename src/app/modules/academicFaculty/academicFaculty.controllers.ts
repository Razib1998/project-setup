/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import sendResponse from "../../utils/senResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Faculty Created Successfully",
      data: result,
    });
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllAcademicFaculty: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result =
      await AcademicFacultyServices.getAllAcademicFacultiesFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Faculties are retrieved Successfully!",
      data: result,
    });
  }
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSingleAcademicFaculty: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const result =
      await AcademicFacultyServices.getSingleAcademicFacultyFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Faculty is retrieved Successfully!",
      data: result,
    });
  }
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateAcademicFaculty: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
      id,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Faculty updated Successfully!",
      data: result,
    });
  }
);
export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};

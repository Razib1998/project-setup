/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";
import sendResponse from "../../utils/senResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result =
      await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Department Created Successfully",
      data: result,
    });
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllAcademicDepartments: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result =
      await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB(
        req.query
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Departments are retrieved Successfully!",
      meta: result.meta,
      data: result.result,
    });
  }
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSingleAcademicDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const result =
      await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Department is retrieved Successfully!",
      data: result,
    });
  }
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateAcademicDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const result =
      await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
        id,
        req.body
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Department updated Successfully!",
      data: result,
    });
  }
);
export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};

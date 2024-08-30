import { RequestHandler } from "express";
import sendResponse from "../../utils/senResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { adminServices } from "./admin.service";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllAdmins: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await adminServices.getAllAdminsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admins are retrieved Successfully!",
    data: result,
  });
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSingleAdmin: RequestHandler = catchAsync(async (req, res, next) => {
  const { adminId } = req.params;
  const result = await adminServices.getSingleAdmin(adminId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "admin is retrieved Successfully!",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const { admin } = req.body;
  const result = await adminServices.updateAdminIntoDB(adminId, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is updated successfully",
    data: result,
  });
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const deleteAdmin: RequestHandler = catchAsync(async (req, res, next) => {
  const { adminId } = req.params;
  const result = await adminServices.deleteAdmin(adminId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "admin deleted Successfully!",
    data: result,
  });
});
export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};

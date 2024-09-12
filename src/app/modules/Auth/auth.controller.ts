/* eslint-disable @typescript-eslint/no-namespace */
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/senResponse";
import { AuthUserServices } from "./auth.service";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthUserServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login Successfully",
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await AuthUserServices.changePassword(passwordData, req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password is changed Successfully",
    data: result,
  });
});

export const AuthUserControllers = {
  loginUser,
  changePassword,
};

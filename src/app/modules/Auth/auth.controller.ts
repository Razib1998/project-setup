/* eslint-disable @typescript-eslint/no-namespace */
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/senResponse";
import { AuthUserServices } from "./auth.service";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthUserServices.loginUser(req.body);

  const { refreshToken, tokenWithBearer, needsPasswordChange } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login Successfully",
    data: {
      tokenWithBearer,
      needsPasswordChange,
    },
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await AuthUserServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password is changed Successfully",
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthUserServices.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token is retrieved succesfully!",
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await AuthUserServices.forgetPAssword(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Forget password link  is generated successfully!",
    data: result,
  });
});

export const AuthUserControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
};

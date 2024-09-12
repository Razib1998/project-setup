import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/senResponse";
import { AuthUserServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthUserServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login Successfully",
    data: result,
  });
});

export const AuthUserControllers = {
  loginUser,
};

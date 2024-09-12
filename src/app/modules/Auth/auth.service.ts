import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";
const loginUser = async (payload: TLoginUser) => {
  // check if the user is available..

  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!!");
  }

  //   check if the user is already deleted..

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This User is already deleted");
  }

  //    check if the user is blocked..

  const userStatus = user?.status;

  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This User is already blocked");
  }

  //   To check password

  const password = await User.isPasswordMatched(
    payload?.password,
    user?.password
  );

  if (!password) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password did not matched");
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "20d",
  });

  return {
    accessToken,
    needsPasswordChange: user?.needPasswordChange,
  };
};

export const AuthUserServices = {
  loginUser,
};

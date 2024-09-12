import { Model } from "mongoose";
import { USER_ROlE } from "./user.constant";

export interface TUser {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  // instance methods check if user is exists..

  isUserExistsByCustomId(id: string): Promise<TUser>;

  // instance methods to check if the password are matched..
  isPasswordMatched(
    plainTextPassword: string,
    hashPassword: string
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROlE;

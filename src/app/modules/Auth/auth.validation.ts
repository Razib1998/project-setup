import { z } from "zod";

const loginUserValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: "Id is required" }),
    password: z.string({ required_error: "password is required" }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: "old password is required" }),
    newPassword: z.string({ required_error: "New password is required" }),
  }),
});

export const AuthValidation = {
  loginUserValidationSchema,
  changePasswordValidationSchema,
};

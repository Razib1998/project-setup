import { z } from "zod";

// Define the Zod schema for the nested objects first
const studentNameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, "First Name can not be more than 20 characters"),
  middleName: z.string().optional(),
  lastName: z.string().trim(),
});

const guardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
});

// Define the main Zod schema for the student
const studentValidationZodSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: studentNameSchema,
      gender: z.enum(["male", "female", "other"], {
        errorMap: () => ({
          message:
            "The gender field can only be one of the following: 'male', 'female', 'other'",
        }),
      }),
      dateOfBirth: z.string().optional(),
      email: z.string().email("Email is not the correct format"),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      profileImg: z.string().optional(),
    }),
  }),
});

export const studentValidations = { studentValidationZodSchema };

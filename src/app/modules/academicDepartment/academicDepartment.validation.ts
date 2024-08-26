import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic Faculty must be string",
      required_error: "Name must be required",
    }),
    academicFaculty: z.string({
      invalid_type_error: "Name  must be string",
      required_error: "Academic Faculty must be required",
    }),
  }),
});
const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "name must be string",
        required_error: "Academic Faculty must be required",
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: "academic faculty  must be string",
        required_error: "Academic Faculty must be required",
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};

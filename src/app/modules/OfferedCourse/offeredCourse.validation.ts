import { z } from "zod";
import { Days } from "./offeredCourse.constant";

const timeStringValidation = z.string().refine(
  (time) => {
    const regex = /^(2[0-3]|[01]?[0-9]):([0-5][0-9])$/;
    return regex.test(time);
  },
  {
    message: "Invalid Time Format!!",
  }
);

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringValidation,
      endTime: timeStringValidation,
    })
    .refine(
      (body) => {
        const start = new Date(`1998-05-10T${body.startTime}:00`);
        const end = new Date(`1998-05-10T${body.endTime}:00`);
        return end > start;
      },
      {
        message: "Start time should be before the end time!!",
      }
    ),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: timeStringValidation,
    endTime: timeStringValidation,
  }),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};

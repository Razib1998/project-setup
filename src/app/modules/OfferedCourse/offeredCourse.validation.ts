import { z } from "zod";
import { Days } from "./offeredCourse.constant";

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
      startTime: z.string().refine(
        (time) => {
          const regex = /^(2[0-3]|[01]?[0-9]):([0-5][0-9])$/;
          return regex.test(time);
        },
        {
          message: "Invalid Time Format!!",
        }
      ),
      endTime: z.string().refine(
        (time) => {
          const regex = /^(2[0-3]|[01]?[0-9]):([0-5][0-9])$/;
          return regex.test(time);
        },
        {
          message: "Invalid Time Format!!",
        }
      ),
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
    maxCapacity: z.number().optional(),
    section: z.number().optional(),
    days: z.array(z.enum([...Days] as [string, ...string[]])).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};

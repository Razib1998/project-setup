import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemester.constant";

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesterName,
      required: [true, "The Name field is required"],
    },
    code: {
      type: String,
      enum: AcademicSemesterCode,
      required: [true, "The code field is required"],
    },
    year: { type: String, required: [true, "The Year field is required"] },
    startMonth: {
      type: String,
      enum: Months,
      required: [true, "The start month field is required"],
    },
    endMonth: {
      type: String,
      enum: Months,
      required: [true, "The end month field is required"],
    },
  },
  { timestamps: true }
);

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);

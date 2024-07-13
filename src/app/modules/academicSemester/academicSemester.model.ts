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
// To Prevent create duplicate semester in same year..
// Using pre hook middleware.
academicSemesterSchema.pre("save", async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new Error("Semester is Already exists");
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);

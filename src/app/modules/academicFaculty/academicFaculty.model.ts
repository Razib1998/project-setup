import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const AcademicFaculty = model<TAcademicFaculty>(
  "AcademicFaculty",
  academicFacultySchema
);

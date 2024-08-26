import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);
// To prevent Duplicate faculty creation..
academicFacultySchema.pre("save", async function (next) {
  const isAcademicFacultyExist = await AcademicFaculty.findOne({
    name: this.name,
  });
  if (isAcademicFacultyExist) {
    throw new Error("This Faculty is Already Exist!!");
  }
  next();
});

// For updating check first is this faculty is exists or not..

academicFacultySchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isAcademicFacultyExist = await AcademicFaculty.findOne(query);
  if (!isAcademicFacultyExist) {
    throw new Error("This faculty does  not exists!!!");
  }
  next();
});

export const AcademicFaculty = model<TAcademicFaculty>(
  "AcademicFaculty",
  academicFacultySchema
);

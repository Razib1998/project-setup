import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../errors/AppError";

const academicDepartmentSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: "AcademicFaculty" },
  },
  { timestamps: true }
);

//  App error handling..

// To prevent same department creation..Here we are using pre hook .
// academicDepartmentSchema.pre("save", async function (next) {
//   const isDepartmentExist = await AcademicDepartment.findOne({
//     name: this.name,
//   });
//   if (isDepartmentExist) {
//     throw new AppError(404, "This department is already exists!!");
//   }
//   next();
// });

// When updating the academic semester we have to check the is the department
// is exist or not....

academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartment.findOne(query);
  if (!isDepartmentExist) {
    throw new AppError(404, "This department does not exist!!!");
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema
);

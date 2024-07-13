import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createSemesterIntoDB = async (payload: TAcademicSemester) => {
  // To check semester name with semester code

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid Semester Code");
  }
  const result = await AcademicSemester.create(payload);
  return result;
};
const getAllSemesters = async () => {
  const result = await AcademicSemester.find();
  return result;
};
const getSemesterById = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

export const AcademicSemesterServices = {
  createSemesterIntoDB,
  getAllSemesters,
  getSemesterById,
};

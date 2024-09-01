import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  // To check semester name with semester code

  const academicSemester = payload?.academicSemester;

  // Check if the academicSemester is exists..

  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This academic semester not found"
    );
  }

  //  check if the semester is already registered..

  const isSemesterAlreadyRegistered =
    await SemesterRegistration.findOne(academicSemester);
  if (isSemesterAlreadyRegistered) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This semester is already registered"
    );
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
};

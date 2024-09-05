import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../Course/course.model";
import { Faculty } from "../Faculty/faculty.model";
import { OfferedCourse } from "./offeredCourse.model";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  // check if the semester Registration is Exists..

  const {
    semesterRegistration,
    academicDepartment,
    academicFaculty,
    course,
    faculty,
  } = payload;

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester Registration not found");
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic department not found");
  }

  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic Faculty not found");
  }

  const isCourseExists = await Course.findById(course);
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }
  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty not found");
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

export const OfferedCorseServices = {
  createOfferedCourseIntoDB,
};

import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { RegistrationStatus } from "./semesterRegistration.constant";

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  // To check semester name with semester code
  const academicSemester = payload?.academicSemester;

  // check if there any registered semester that is already "UPCOMING|"ONGOING
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });
  console.log(isThereAnyUpcomingOrOngoingSemester);

  // if (isThereAnyUpcomingOrOngoingSemester) {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester`
  //   );
  // }

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

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>
) => {
  const SemesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await SemesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate("academicSemester");
  return result;
};

// const updateSemesterRegistrationIntoDB = async (
//   id: string,
//   payLoad: Partial<TSemesterRegistration>
// ) => {};
export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
};

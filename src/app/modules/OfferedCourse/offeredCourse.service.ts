import AppError from "../../errors/AppError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse, TSchedule } from "./offeredCourse.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../Course/course.model";
import { Faculty } from "../Faculty/faculty.model";
import { OfferedCourse } from "./offeredCourse.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { hasTimeConflict } from "./offeredCourse.utils";
import httpStatus from "http-status";
import { Student } from "../student/student-model";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicDepartment,
    academicFaculty,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
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

  // check if the department is belong to the same faculty..

  const isTheDepartmentBelongToSameFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isTheDepartmentBelongToSameFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExists.name} is not belong to ${isAcademicFacultyExists.name}`
    );
  }

  // check if the offered course same section in same registered semester exists..

  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exist!`
    );
  }

  // get the schedule of the faculties..

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This Faculty is not available at that time, please chose another time or day!`
    );
  }
  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  const OfferedCourseQuery = new QueryBuilder(
    OfferedCourse.find()
      .populate("semesterRegistration")
      .populate("academicFaculty")
      .populate("academicDepartment")
      .populate("faculty")
      .populate("course"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await OfferedCourseQuery.modelQuery;
  const meta = await OfferedCourseQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getMyOfferedCoursesFromDB = async (
  userId: string,
  query: Record<string, unknown>
) => {
  //pagination setup

  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const student = await Student.findOne({ id: userId });
  // find the student
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "User is noty found");
  }

  //find current ongoing semester
  const currentOngoingRegistrationSemester = await SemesterRegistration.findOne(
    {
      status: "ONGOING",
    }
  );

  if (!currentOngoingRegistrationSemester) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "There is no ongoing semester registration!"
    );
  }

  const aggregationQuery = [
    {
      $match: {
        semesterRegistration: currentOngoingRegistrationSemester?._id,
        academicFaculty: student.academicFaculty,
        academicDepartment: student.academicDepartment,
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "course",
        foreignField: "_id",
        as: "course",
      },
    },
    {
      $unwind: "$course",
    },
    {
      $lookup: {
        from: "enrolledcourses",
        let: {
          currentOngoingRegistrationSemester:
            currentOngoingRegistrationSemester._id,
          currentStudent: student._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: [
                      "$semesterRegistration",
                      "$$currentOngoingRegistrationSemester",
                    ],
                  },
                  {
                    $eq: ["$student", "$$currentStudent"],
                  },
                  {
                    $eq: ["$isEnrolled", true],
                  },
                ],
              },
            },
          },
        ],
        as: "enrolledCourses",
      },
    },
    {
      $lookup: {
        from: "enrolledcourses",
        let: {
          currentStudent: student._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$student", "$$currentStudent"],
                  },
                  {
                    $eq: ["$isCompleted", true],
                  },
                ],
              },
            },
          },
        ],
        as: "completedCourses",
      },
    },
    {
      $addFields: {
        completedCourseIds: {
          $map: {
            input: "$completedCourses",
            as: "completed",
            in: "$$completed.course",
          },
        },
      },
    },
    {
      $addFields: {
        isPreRequisitesFulFilled: {
          $or: [
            { $eq: ["$course.preRequisiteCourses", []] },
            {
              $setIsSubset: [
                "$course.preRequisiteCourses.course",
                "$completedCourseIds",
              ],
            },
          ],
        },
        isAlreadyEnrolled: {
          $in: [
            "$course._id",
            {
              $map: {
                input: "$enrolledCourses",
                as: "enroll",
                in: "$$enroll.course",
              },
            },
          ],
        },
      },
    },
    {
      $match: {
        isAlreadyEnrolled: false,
        isPreRequisitesFulFilled: true,
      },
    },
  ];
  const paginationQuery = [
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];
  const result = await OfferedCourse.aggregate([
    ...aggregationQuery,
    ...paginationQuery,
  ]);

  const total = (await OfferedCourse.aggregate(aggregationQuery)).length;

  const totalPage = Math.ceil(result.length / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    result,
  };
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id)
    .populate("semesterRegistration")
    .populate("academicFaculty")
    .populate("academicDepartment")
    .populate("faculty")
    .populate("course");

  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Partial<TOfferedCourse>
) => {
  const { faculty, startTime, endTime, days } = payload;

  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This offered course is not available!`
    );
  }

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, `This faculty is  not available!`);
  }

  //  get semester registration status..

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== "UPCOMING") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update this offered course as its is ${semesterRegistrationStatus?.status}`
    );
  }
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule as TSchedule)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This Faculty is not available at that time, please chose another time or day!`
    );
  }
  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteOfferedCourseFromDB = async (id: string) => {
  // check if the offered course are available..

  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This Offered course is not available!`
    );
  }

  const semesterRegistration = isOfferedCourseExists?.semesterRegistration;

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== "UPCOMING") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course can not update ! because the semester ${semesterRegistrationStatus}`
    );
  }

  const result = await OfferedCourse.findByIdAndDelete(id);
  return result;
};
export const OfferedCorseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getMyOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  deleteOfferedCourseFromDB,
};

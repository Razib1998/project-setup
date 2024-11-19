import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("preRequisiteCourses.course"),
    query
  )

    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  const meta = await courseQuery.countTotal();
  return {
    result,
    meta,
  };
};
const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    "preRequisiteCourses.course"
  );
  return result;
};

const updateCourseFromDB = async (id: string, payLoad: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remainingCourseData } = payLoad;

  const session = await mongoose.startSession();
  // course basic info update..
  session.startTransaction();

  try {
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      remainingCourseData,
      {
        session,
        new: true,
        runValidators: true,
      }
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Failed to update course basic Info"
      );
    }

    // check if the preRequisiteCourses are available..

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // Filter out deleted Fields..

      const deletedPreRequisite = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisite } },
          },
        },
        {
          session,
          new: true,
          runValidators: true,
        }
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
      }

      // filter out new added courses..

      const newPreRequisite = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted
      );

      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisite } },
        },
        {
          session,
          new: true,
          runValidators: true,
        }
      );
      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
      }
    }
    await session.commitTransaction();
    await session.endSession();
    const result = await Course.findById(id).populate(
      "preRequisiteCourses.course"
    );
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payLoad: Partial<TCourseFaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payLoad } },
    },
    { upsert: true, new: true }
  );
  return result;
};
const getFacultiesWithCourseFromDB = async (courseId: string) => {
  const result = await CourseFaculty.findOne({ course: courseId }).populate(
    "faculties"
  );
  return result;
};
const removeFacultiesWithCourseFromDB = async (
  id: string,
  payLoad: Partial<TCourseFaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payLoad } },
    },
    { upsert: true, new: true }
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesWithCourseFromDB,
  getFacultiesWithCourseFromDB,
};

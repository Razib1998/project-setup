import mongoose from "mongoose";
import { Student } from "./student-model";
import AppError from "../../middlwares/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await Student.findOne({ id: id });
  return result;
};
const deleteStudent = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to delete student");
  }

  return deleteStudent;
};

export const studentService = {
  getAllStudentsFromDB,
  getSingleStudent,
  deleteStudent,
};

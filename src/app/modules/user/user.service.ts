import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
//  import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { Student } from "../student/student-model";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generatedStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = "student";

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );

  //set  generated id
  userData.id = await generatedStudentId(
    admissionSemester as TAcademicSemester
  );

  // create a user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; //reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  getAllUsersFromDB,
  getSingUserFromDB,
};

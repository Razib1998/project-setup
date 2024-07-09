import { Student } from "./student-model";

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const studentService = {
  getAllStudentsFromDB,
  getSingleStudent,
};

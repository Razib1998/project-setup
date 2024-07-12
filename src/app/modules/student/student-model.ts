import { Schema, model } from "mongoose";
import validator from "validator";

import {
  TStudent,
  StudentMethods,
  StudentModel,
  TStudentName,
  TLocalGuardian,
  TGuardian,
} from "./student.interface";

const studentNameSchema = new Schema<TStudentName>({
  firstName: {
    type: String,
    trim: true,
    maxlength: [20, "First Name can not be more than 20 characters"],
    required: [true, "First Name field is required"],
  },
  middleName: { type: String },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last Name field is required"],
    // validate using validator library..

    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not correct format",
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father Name field is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father Occupation field is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father Contact No field is required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother name field is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother occupation field is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother Contact No field is required"],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, "Name field is required"] },
  occupation: {
    type: String,
    required: [true, "Occupation field is required"],
  },
  contactNo: { type: String, required: [true, "Name field is required"] },
});

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
  id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User id is required"],
    unique: true,
    ref: "User",
  },
  name: {
    type: studentNameSchema,
    required: [true, "Name field is required"],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message:
        "The gender field can only be one of the following:'male','female','other'",
    },
    required: [true, "Gender field is required"],
  },
  dateOfBirth: { type: Date },
  email: {
    type: String,
    unique: true,
    required: [true, "Email field is required"],
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "{VALUE} is not correct email format",
    },
  },
  contactNo: { type: String, required: [true, "Contact No field is required"] },
  emergencyContactNo: {
    type: String,
    required: [true, "Emergency Contact no field is required"],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      message:
        'The gender field can only be one of the following:"A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"',
    },
  },
  presentAddress: {
    type: String,
    required: [true, "Present Address field is required"],
  },
  permanentAddress: {
    type: String,
    required: [true, "Permanent address field is required"],
  },
  guardian: {
    type: guardianSchema,
    required: [true, "guardian field is required"],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local guardian field is required"],
  },
  profileImg: { type: String },
});

export const Student = model<TStudent, StudentModel>("Student", studentSchema);

import { model, Schema } from "mongoose";
import { FacultyModel, TFaculty, TUserName } from "./faculty.interface";
import { BloodGroup, Gender } from "./faculty.constant";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "FirstName is required"],
    trim: true,
    maxlength: [20, "Name can not be more than 20 characters"],
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, "FirstName is required"],
    trim: true,
    maxlength: [20, "Name can not be more than 20 characters"],
  },
});

const facultySchema = new Schema<TFaculty, FacultyModel>(
  {
    id: { type: String, required: [true, "Id is required"], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User is Required"],
      unique: true,
      ref: "User",
    },
    designation: { type: String, required: [true, "designation is required"] },
    name: { type: userNameSchema, required: [true, "Name is required"] },
    gender: {
      type: String,
      enum: { values: Gender, message: "{Value} is not given" },
    },
    dataOfBirth: { type: String },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    contactNo: { type: String, required: [true, "Contact no is required"] },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: "{VALUE} is not a valid blood group",
      },
    },
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
    },
    profileImg: { type: String, default: "" },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, "Academic Department  is required"],
      ref: "AcademicDepartment",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

facultySchema.virtual("fullName").get(function () {
  return this?.name?.firstName + " " + this?.name?.lastName;
});

// Query Middleware
facultySchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

facultySchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Checking is faculty is already available.

facultySchema.statics.isFacultyExists = async function (id: string) {
  const existingFaculty = await Faculty.findOne({ id });
  return existingFaculty;
};

export const Faculty = model<TFaculty>("Faculty", facultySchema);

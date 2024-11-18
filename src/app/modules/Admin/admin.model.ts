import { model, Schema } from "mongoose";
import { AdminModel, TAdmin, TUserName } from "./admin.interface";
import { BloodGroup, Gender } from "./admin.constant";

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

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    id: { type: String, required: [true, "Id is required"], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User is Required"],
      unique: true,
      ref: "User",
    },
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

adminSchema.virtual("fullName").get(function () {
  return this?.name?.firstName + " " + this?.name?.lastName;
});

// Query Middleware
adminSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Checking is faculty is already available.

adminSchema.statics.isAdminExists = async function (id: string) {
  const existingAdmin = await Admin.findOne({ id });
  return existingAdmin;
};

export const Admin = model<TAdmin>("Admin", adminSchema);

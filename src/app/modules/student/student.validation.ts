import Joi from "joi";

const studentNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .messages({
      "string.pattern.base": "{#label} must be capitalized",
      "string.max": "First Name cannot be more than 20 characters",
      "any.required": "First Name field is required",
    })
    .required(),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .trim()
    .messages({
      "string.pattern.base": "{#label} is not the correct format",
      "any.required": "Last Name field is required",
    })
    .required(),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    "any.required": "Father Name field is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    "any.required": "Father Occupation field is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    "any.required": "Father Contact No field is required",
  }),
  motherName: Joi.string().required().messages({
    "any.required": "Mother Name field is required",
  }),
  motherOccupation: Joi.string().required().messages({
    "any.required": "Mother Occupation field is required",
  }),
  motherContactNo: Joi.string().required().messages({
    "any.required": "Mother Contact No field is required",
  }),
});

const localGuardianSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name field is required",
  }),
  occupation: Joi.string().required().messages({
    "any.required": "Occupation field is required",
  }),
  contactNo: Joi.string().required().messages({
    "any.required": "Contact No field is required",
  }),
});

// Define the main Joi schema for the student
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "ID field is required",
  }),
  name: studentNameSchema.required().messages({
    "any.required": "Name field is required",
  }),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    "any.only":
      "The gender field can only be one of the following: 'male', 'female', 'other'",
    "any.required": "Gender field is required",
  }),
  dateOfBirth: Joi.date().messages({
    "date.format": "Date of Birth must be in ISO format",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "{#label} is not a correct email format",
    "any.required": "Email field is required",
  }),
  contactNo: Joi.string().required().messages({
    "any.required": "Contact No field is required",
  }),
  emergencyContactNo: Joi.string().required().messages({
    "any.required": "Emergency Contact No field is required",
  }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .messages({
      "any.only":
        'The blood group field can only be one of the following: "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"',
    }),
  presentAddress: Joi.string().required().messages({
    "any.required": "Present Address field is required",
  }),
  permanentAddress: Joi.string().required().messages({
    "any.required": "Permanent Address field is required",
  }),
  guardian: guardianSchema.required().messages({
    "any.required": "Guardian field is required",
  }),
  localGuardian: localGuardianSchema.required().messages({
    "any.required": "Local Guardian field is required",
  }),
  profileImg: Joi.string().uri().optional(),
  isActive: Joi.string().valid("Active", "unActive").default("Active"),
});

export default studentValidationSchema;

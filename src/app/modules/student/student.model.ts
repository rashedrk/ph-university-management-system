import { Schema, model } from 'mongoose';
import { StudentModel, TGuardian, TStudent, TUsername, TlocalGuardian } from './student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config/config';

const usernameSchema = new Schema<TUsername>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    maxlength: [20, "First Name can not be more than 20 characters"],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase + value.slice(1);
        return firstNameStr !== value;
      },
      message: "{VALUE} is not in a capitalized format"
    },

  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not accepted"
    }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, "Father's Name is required"] },
  fatherOccupation: { type: String, required: [true, "Father's Occupation is required"] },
  fatherContactNo: { type: String, required: [true, "Father's Contact Number is required"] },
  motherName: { type: String, required: [true, "Mother's Name is required"] },
  motherOccupation: { type: String, required: [true, "Mother's Occupation is required"] },
  motherContactNo: { type: String, required: [true, "Mother's Contact Number is required"] },
});

const localGuardianSchema = new Schema<TlocalGuardian>({
  name: { type: String, required: [true, "Local Guardian's Name is required"] },
  occupation: { type: String, required: [true, "Local Guardian's Occupation is required"] },
  contactNo: { type: String, required: [true, "Local Guardian's Contact Number is required"] },
  address: { type: String, required: [true, "Local Guardian's Address is required"] },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: [true, "Student ID is required"], unique: true },
  name: {
    type: usernameSchema,
    required: [true, "Student's Name is required"],
  },
  password: {
    type: String,
    required: [true, "Student's Password is required"],
    maxlength: [20, "Student's Password cannot exceed 20 characters"]
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: "{VALUE} is not accepted",
    },
    required: [true, "Gender is required"],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "{VALUE} is not a valid email type"
    }
  },
  contactNo: { type: String, required: [true, "Contact Number is required"] },
  emergencyContactNo: { type: String, required: [true, "Emergency Contact Number is required"] },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: "{VALUE} is not a valid blood group",
    },
  },
  presentAddress: { type: String, required: [true, "Present Address is required"] },
  permanentAddress: { type: String, required: [true, "Permanent Address is required"] },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian information is required"],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local Guardian information is required"],
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
  isDeleted: { type: Boolean, default: false },
}, {
  toJSON: {
    virtuals: true
  }
});

//virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})

//Middlewares

//works for create() and save()
studentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcyrpt_salt_rounds));

  next();
})

studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
})

//Query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//for custom instance methods
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser
// }

// for custom static methods 
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser
}


export const Student = model<TStudent, StudentModel>('Student', studentSchema);



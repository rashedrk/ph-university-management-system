import { Model, Types } from "mongoose";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUsername = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TlocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TUsername;
  password: string;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TlocalGuardian;
  admissionSemester: Types.ObjectId;
  profileImg?: string;
  isDeleted: boolean;
};

//for custom instance methods
// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>
// }

// for custom static methods 
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>
}

// export type StudentModel = Model<TStudent, Record<string, never>, StudentMethods>
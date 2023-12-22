import { TStudent } from './student.interface';
import { Student } from './student.model';

//Database operation
const createStudentIntoDB = async (studentData: TStudent) => {
  //custom static method
  if (await Student.isUserExists(studentData.id)) {
    throw new Error("User already exists!");
  }
  // built-in static method
  const result = await Student.create(studentData);

  //creating instance of Student
  // const student = new Student(studentData);

  //custom instance method
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error("User already exists!");

  // }

  //built-in instance method
  // const result = await student.save();

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([
    {$match: {id}}
  ]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, {isDeleted: true});
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};

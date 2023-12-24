import config from "../../config/config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
    //if password is not provided use the default

    const user: Partial<TUser> = {}

    user.password = password || (config.default_password as string);
    user.role = 'student';

    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)

    user.id =  await generateStudentId(admissionSemester)

    //create a new user
    const newUser = await User.create(user);

    //create a student
    if (Object.keys(newUser).length) {
        payload.id = newUser.id;
        payload.user = newUser._id;

        const newStudent = await Student.create(payload);
        return newStudent;
    }
};

export const UserServices = {
    createStudentIntoDB,
}
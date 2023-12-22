import config from "../../config/config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
    //if password is not provided use the default

    const user: Partial<TUser> = {}

    user.password = password || (config.default_password as string);
    user.role = 'student';
    //manually generate id
    user.id = "2030010001"

    //create a new user
    const newUser = await User.create(user);

    //create a student
    if (Object.keys(newUser).length) {
        studentData.id = newUser.id;
        studentData.user = newUser._id;

        const newStudent = await Student.create(studentData);
        return newStudent;
    }
};

export const UserServices = {
    createStudentIntoDB,
}
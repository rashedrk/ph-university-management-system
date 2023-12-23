import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createStudent = catchAsync(async (req, res) => {
    const { password, student: studentData } = req.body;

    //call service func to send this data
    const result = await UserServices.createStudentIntoDB(password, studentData);

    sendResponse(res, {
        message: 'Student is created successfully',
        data: result,
    });

});

export const UserControllers = {
    createStudent,

}
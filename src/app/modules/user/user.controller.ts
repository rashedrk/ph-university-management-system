import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import { NextFunction, Request, Response } from 'express';

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, student: studentData } = req.body;

        //validation using zod
        // const zodParsedData = studentValidationSchema.parse(studentData);

        //call service func to send this data
        const result = await UserServices.createStudentIntoDB(password, studentData);

        sendResponse(res, {
            message: 'Student is created successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

export const UserControllers = {
    createStudent,

}
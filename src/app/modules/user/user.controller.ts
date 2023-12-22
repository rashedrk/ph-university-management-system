import { UserServices } from "./user.service";
import { NextFunction, Request, Response } from 'express';

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, student: studentData } = req.body;

        //validation using zod
        // const zodParsedData = studentValidationSchema.parse(studentData);

        //call service func to send this data
        const result = await UserServices.createStudentIntoDB(password, studentData);

        //send response
        res.status(200).json({
            success: true,
            message: 'Student created successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

export const UserControllers = {
    createStudent,

}
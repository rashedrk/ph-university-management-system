import { UserServices } from "./user.service";
import { Request, Response } from 'express';

const createStudent = async (req: Request, res: Response) => {
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
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: error,
        });
    }
};

export const UserControllers = {
    createStudent,

}
import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';

const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    sendResponse(res, {
      message: 'Students retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
      message: 'Student retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    sendResponse(res, {
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent
};

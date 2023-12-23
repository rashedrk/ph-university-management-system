/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

// eslint-disable-next-line no-unused-vars
const notFoundError = (req: Request, res: Response, next: NextFunction) => {
    const message ="API not found!";

    return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message,
        error: ''
    })
}

export default notFoundError;
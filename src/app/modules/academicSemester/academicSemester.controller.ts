import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createAcademicSemester = catchAsync(async (req, res) => {


    sendResponse(res, {
        message: 'Student is created successfully',
        data: '',
    });

});

export const AcademicSemesterControllers = {
    createAcademicSemester,

}
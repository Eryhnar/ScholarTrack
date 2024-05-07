import { archiveStudentService, createStudentService, editGroupStudentByIdService, getGroupStudentByIdService, getGroupStudentsService } from "./student-service.js";

export const createStudent = async (req, res, next) => {
    try {
        const userId = req.tokenData.userId;
        const student = await createStudentService(userId, req.body);
        res.status(201).json(
            {
                success: true,
                message: "Student created successfully",
                data: student,
            }
        );
    } catch (error) {
        next(error);
    }
}

export const getGroupStudents = async (req, res, next) => {
    try {
        const userId = req.tokenData.userId;
        const { groupId } = req.params;
        const students = await getGroupStudentsService(userId, groupId);
        res.status(200).json(
            {
                success: true,
                message: "Students fetched successfully",
                data: students,
            }
        );
    } catch (error) {
        next(error);
    }
}

export const getGroupStudentById = async (req, res, next) => {
    try {
        const userId = req.tokenData.userId
        const { groupId, studentId } = req.params;

        const student = await getGroupStudentByIdService(userId, groupId, studentId);
        res.status(200).json(
            {
                success: true,
                message: "Student fetched successfully",
                data: student,
            }
        );
    } catch (error) {
        next(error);
    }
}

export const editGroupStudentById = async (req, res, next) => {
    try {
        const userId = req.tokenData.userId;
        const { groupId, studentId } = req.params;
        const studentInfo = req.body;
        const student = await editGroupStudentByIdService(userId, groupId, studentId, studentInfo);
        res.status(200).json(
            {
                success: true,
                message: "Student updated successfully",
                data: student,
            }
        );
    } catch (error) {
        next(error);
    }
}

export const archiveStudent = async (req, res, next) => {
    try {
        const userId = req.tokenData.userId;
        const { groupId, studentId } = req.params;
        await archiveStudentService(userId, groupId, studentId);
        res.status(200).json(
            {
                success: true,
                message: "Student archived successfully",
            }
        );
    } catch (error) {
        next(error);
    }
}

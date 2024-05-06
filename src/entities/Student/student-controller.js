import { createStudentService, getGroupStudentByIdService, getGroupStudentsService } from "./student-service.js";

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
        res.status(200).json(
            {
                success: true,
                message: "Student updated successfully",
                data: {},
            }
        );
    } catch (error) {
        next(error);
    }
}

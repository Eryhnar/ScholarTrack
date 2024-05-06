import { createStudentService, getGroupStudentByIdService, getGroupStudentsService } from "./student-service.js";

export const createStudent = async (req, res, next) => {
    try {
        const student = await createStudentService(req.body);
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
        const { groupId } = req.params;
        const students = await getGroupStudentsService(groupId);
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
        const { groupId, studentId } = req.params;
        const userId = req.tokenData.userId

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

import { createStudentService } from "./student-service.js";

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
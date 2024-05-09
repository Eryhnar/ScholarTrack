import { createAttendanceService } from "./attendance-service.js";

export const createAttendance = async (req, res, next) => { //this will be removed or changed when calendar is implemented
    try {
        const { date, present } = req.body;
        const { groupId, studentId } = req.params;

        const attendance = await createAttendanceService(date, present, groupId, studentId);
        res.status(201).json(
            {
                success: true,
                message: "Attendance created successfully",
                data: attendance,
            }
        );
    } catch (error) {
        next(error);
    }
}
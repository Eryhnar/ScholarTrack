import Attendance from "./attendance-model";

export const createAttendanceRepository = async (date, present, groupId, studentId) => {
    try {
        return await Attendance.create({
            date,
            present,
            group: groupId,
            student: studentId,
        });
    } catch (error) {
        throw error;
    }
}
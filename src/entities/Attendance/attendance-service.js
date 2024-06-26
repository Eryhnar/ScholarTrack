import { createAttendanceRepository } from "./attendance-repository.js";

export const createAttendanceService = async (date, present, groupId, studentId) => {
    const session = await startSession();
    session.startTransaction();
    try {
        if (!date || present === null || present === undefined || !groupId) {
            throw new Error("All fields are required");
        }
        const students = await getStudentsByGroupId(groupId, session);
        const attendances = [];
        for (const student of students) {
            const attendance = await createAttendanceRepository(date, present, groupId, student._id, session);
            attendances.push(attendance);
        }

        await session.commitTransaction();
        return attendances;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

export const createAttendanceService = async (date, present, groupId, studentId) => {
    try {
        if (!date || !present || !groupId || !studentId) {
            throw new Error("All fields are required");
        }
        const newAttendance = await createAttendanceRepository(date, present, groupId, studentId);
        return newAttendance;
    } catch (error) {
        throw error;
    }
}
import { createAttendanceRepository } from "./attendance-repository.js";

// export const createAttendanceService = async (date, present, groupId, studentId) => {
//     try {
//         if (!date || !present || !groupId || !studentId) {
//             throw new Error("All fields are required");
//         }
//         return await createAttendanceRepository(date, present, groupId, studentId);
//     } catch (error) {
//         throw error;
//     }
// }

// export const createAttendanceService = async (date, present, groupId) => {
//     const session = await startSession();
//     session.startTransaction();
//     try {
//         if (!date || present === null || present === undefined || !groupId) {
//             throw new Error("All fields are required");
//         }
//         const students = await getStudentsByGroupId(groupId, session);
//         const attendances = [];
//         for (const student of students) {
//             const attendance = await createAttendanceRepository(date, present, groupId, student._id, session);
//             attendances.push(attendance);
//         }

//         await session.commitTransaction();
//         return attendances;
//     } catch (error) {
//         await session.abortTransaction();
//         throw error;
//     } finally {
//         session.endSession();
//     }
// }

// TODO add check for active in the repository
export const createAttendanceService = async (date, groupId) => {
    const session = await startSession();
    session.startTransaction();
    try {
        if (!date || !groupId) {
            throw new Error("All fields are required");
        }
        const students = await getStudentsByGroupId(groupId, session);
        const attendances = [];
        for (const student of students) {
            const attendance = await createAttendanceRepository(date, groupId, student._id, session);
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

export const getGroupDateAttendanceService = async (date, groupId) => {
    try {
        if (!date || !groupId) {
            throw new Error("All fields are required");
        }
        return await getGroupDateAttendanceRepository(date, groupId);
    } catch (error) {
        throw error;
    }
}

export const editStudentAttendanceService = async (date, groupId, studentAttendances) => {
    const session = await startSession();
    session.startTransaction();
    try {
        if (!date || !groupId || !studentAttendances) {
            throw new Error("All fields are required");
        }

        const updatedAttendances = [];
        for (const { studentId, attendanceStatus } of studentAttendances) {
            const updatedAttendance = await editStudentAttendanceRepository(date, groupId, studentId, attendanceStatus, session);
            updatedAttendances.push(updatedAttendance);
        }

        await session.commitTransaction();
        return updatedAttendances;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

export const deleteGroupDateAttendanceService = async (date, groupId) => {
    try {
        if (!date || !groupId) {
            throw new Error("All fields are required");
        }
        return await deleteGroupDateAttendanceRepository(date, groupId);
    } catch (error) {
        throw error;
    }
}
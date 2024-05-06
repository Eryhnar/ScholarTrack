import Group from "../Group/group-model.js";
import Student from "./student-model.js";

export const createStudentRepository = async (studentInfo) => {
    try {
        const student = await Student.create(
            studentInfo
        );
        return student;
    } catch (error) {
        throw error;
    }
}

export const getGroupStudentsRepository = async (groupId) => {
    try {
        const students = await Student.find(
            {
                groups: groupId,
            }
        );
        return students;
    } catch (error) {
        throw error;
    }
}

export const isUserAuthorizedForGroup = async (userId, groupId) => {
    try {
        return await Group.exists({
            _id: groupId,
            $or: [
                { author: userId },
                { collaborators: { $in: [userId] } }
            ]
        });
    } catch (error) {
        throw error;
    }
}

export const getGroupStudentByIdRepository = async (groupId, studentId) => {
    try {
        const student = await Student.findOne(
            {
                _id: studentId,
                groups: groupId,
            }
        );
        return student;
    } catch (error) {
        throw error;
    }
}
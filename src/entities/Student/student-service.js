import NotFoundError from '../../utils/errors/NotFoundError.js';
import { createStudentRepository, deleteStudentRepository, editStudentByIdRepository, getGroupStudentByIdRepository, getGroupStudentsRepository, getStudentsOverviewRepository, studentExists } from './student-repository.js';
import InvalidInputError from '../../utils/errors/InvalidInputError.js';
import UnauthorizedError from '../../utils/errors/UnauthorizedError.js';
import { isUserAuthorizedForGroup } from '../Group/group-repository.js';

export const createStudentService = async (userId, studentData) => {
    try {
        const studentInfo = {};
        const { name, surname, age, group } = studentData;
        studentInfo.groups = group ? [group] : [];

        if (!name || !surname || !age) {
            throw new InvalidInputError(400, "Please provide all required fields");
        }
        studentInfo.name = name;
        studentInfo.surname = surname;
        studentInfo.age = age;
        if (!(await isUserAuthorizedForGroup(userId, group))) {
            throw new UnauthorizedError(403, "You are not authorized to view this group");
        }

        const student = await createStudentRepository(studentInfo);
        return student;
    } catch (error) {
        throw error;
    }
}

export const getGroupStudentsService = async (userId, groupId) => {
    try {
        if (!groupId) {
            throw new InvalidInputError(400, "Please provide all required fields");
        }
        if (!(await isUserAuthorizedForGroup(userId, groupId))) {
            throw new UnauthorizedError(403, "You are not authorized to view this group");
        }
        const students = await getGroupStudentsRepository(groupId);
        return students;
    } catch (error) {
        throw error;
    }
}

export const getGroupStudentByIdService = async (userId, groupId, studentId) => {
    try {
        if (!groupId || !studentId) {
            throw new InvalidInputError(400, "Please provide all required fields");
        }
        if (!(await isUserAuthorizedForGroup(userId, groupId))) {
            throw new UnauthorizedError(403, "You are not authorized to view this group");
        }
        const student = await getGroupStudentByIdRepository(studentId);
        return student;
    } catch (error) {
        throw error;
    }
}

export const editGroupStudentByIdService = async (userId, groupId, studentId, studentInfo) => {
    try {
        const { name, surname, age, group } = studentInfo;
        const newInfo = {};
        if (!groupId || !studentId) {
            throw new InvalidInputError(400, "Please provide all required fields");
        }
        if (name) newInfo.name = name;
        if (surname) newInfo.surname = surname;
        if (age) newInfo.age = age;
        if (group) newInfo.groups = [group];

        if (!(await isUserAuthorizedForGroup(userId, groupId))) {
            throw new UnauthorizedError(403, "You are not authorized to view this group");
        }
        if (!(await studentExists(studentId))) {
            throw new NotFoundError(404, "Student not found");
        }
        const updatedStudent = await editStudentByIdRepository(studentId, newInfo);
        return updatedStudent;
    } catch (error) {
        throw error;
    }
}

export const archiveStudentService = async (userId, groupId, studentId) => {
    try {
        if (!groupId || !studentId) {
            throw new InvalidInputError(400, "Please provide all required fields");
        }
        if (!(await isUserAuthorizedForGroup(userId, groupId))) {
            throw new UnauthorizedError(403, "You are not authorized to view this group");
        }
        if (!(await studentExists(studentId))) {
            throw new NotFoundError(404, "Student not found");
        }
        await editStudentByIdRepository(studentId, { status: "archived" });
    } catch (error) {
        throw error;
    }
}

export const deleteStudentService = async (userId, groupId, studentId) => {
    try {
        if (!groupId || !studentId) {
            throw new InvalidInputError(400, "Please provide all required fields");
        }
        if (!(await isUserAuthorizedForGroup(userId, groupId))) {
            throw new UnauthorizedError(403, "You are not authorized to view this group");
        }
        if (!(await studentExists(studentId))) {
            throw new NotFoundError(404, "Student not found");
        }
        await deleteStudentRepository(studentId);
    } catch (error) {
        throw error;
    }
}

export const getStudentsOverviewService = async (userId, groupId) => {
    try {
        if (!groupId || !userId) {
            throw new InvalidInputError(400, "Please provide all required fields");
        }

        if (!(await isUserAuthorizedForGroup(userId, groupId))) {
            throw new UnauthorizedError(403, "You are not authorized to view this group");
        }
        const student = await getStudentsOverviewRepository(groupId);
        return student;
    } catch (error) {
        throw error;
    }
}

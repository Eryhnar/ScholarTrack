import { createStudentRepository, getGroupStudentByIdRepository, getGroupStudentsRepository, isUserAuthorizedForGroup } from './student-repository.js';

export const createStudentService = async (userId, studentData) => {
    try {
        const studentInfo = {};
        const { name, surname, age, group } = studentData;
        studentInfo.groups = group ? [group] : [];  

        if ( !name || !surname || !age ) {
            throw new InvalidInputError(400, "Please provide all required fields");
        }
        studentInfo.name = name;
        studentInfo.surname = surname;
        studentInfo.age = age;
if ( !(await isUserAuthorizedForGroup(userId, group)) ) {
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
        if ( !groupId ) {
            throw new InvalidInputError(400, "Please provide all required fields");
        }
        if ( !(await isUserAuthorizedForGroup(userId, groupId)) ) {
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
        if ( !groupId || !studentId ) {
            throw new InvalidInputError(400, "Please provide all required fields");
        }
        if ( !(await isUserAuthorizedForGroup(userId, groupId)) ) {
    throw new UnauthorizedError(403, "You are not authorized to view this group");
}
        const student = await getGroupStudentByIdRepository(groupId, studentId);
        return student;
    } catch (error) {
        throw error;
    }
}
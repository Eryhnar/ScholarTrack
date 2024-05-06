import { createStudentRepository } from './student-repository.js';

export const createStudentService = async (studentData) => {
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

        const student = await createStudentRepository(studentInfo);
        return student;
    } catch (error) {
        throw error;
    }
}
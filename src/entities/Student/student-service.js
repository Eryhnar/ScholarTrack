import { createStudentRepository } from './student-repository.js';

export const createStudentService = async (studentData) => {
    try {
        const { name, surname, age } = studentData;
        if ( !name || !surname || !age ) {
            throw new InvalidInputError(400, "Please provide all required fields");
        }

        const student = await createStudentRepository(name, surname, age);
        return student;
    } catch (error) {
        throw error;
    }
}
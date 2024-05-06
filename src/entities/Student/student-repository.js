import Student from "./student-model.js";

export const createStudentRepository = async (name, surname, age) => {
    try {
        const student = await Student.create({
            name,
            surname,
            age
        });
        return student;
    } catch (error) {
        throw error;
    }
}
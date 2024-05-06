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
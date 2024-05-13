import Student from '../../entities/Student/student-model.js';

const seedStudents = async (groupIds, number) => {
    const students = Array.from({ length: number }, (_, index) => ({
        name: `Student ${index + 1}`,
        surname: `Surname ${index + 1}`,
        groups: [groupIds[Math.floor(Math.random() * groupIds.length)]],
        status: 'active',
        age: Math.floor(Math.random() * 10) + 15
    }));

    return await Student.create(students);
};

export default seedStudents;
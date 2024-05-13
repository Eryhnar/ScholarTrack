import Mark from '../../entities/Mark/mark-model.js';

const seedMarks = async (studentIds, taskIds, groupIds) => {
    const marks = [];

    for (const studentId of studentIds) {
        for (const groupId of groupIds) {
            for (const taskId of taskIds) {
                marks.push({
                    student: studentId,
                    task: taskId,
                    group: groupId,
                    value: Math.floor(Math.random() * 100) + 1
                });
            }
        }
    }

    return await Mark.create(marks);
};

export default seedMarks;
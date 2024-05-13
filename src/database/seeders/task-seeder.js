import Task from '../../entities/Task/task-model.js';

const seedTasks = async (groupIds, number) => {
    const weightPerTask = 100 / number;
    const tasks = Array.from({ length: number }, (_, index) => ({
        name: `Task ${index + 1}`,
        description: `This is task ${index + 1}`,
        deadline: new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000), // deadlines set to days from now
        groups: [groupIds[Math.floor(Math.random() * groupIds.length)]],
        weight: weightPerTask.toString(),
        optional: false,
        tags: [`tag${index + 1}`, `tag${index + 2}`]
    }));

    return await Task.create(tasks);
};

export default seedTasks;
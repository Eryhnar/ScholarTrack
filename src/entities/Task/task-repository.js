import Task from "./task-model.js";

export const createTaskRepository = async (newTask) => {
    try {
        const task = await Task.create(newTask);
        return task;
    } catch (error) {
        throw error;
    }
}

export const getGroupTasksRepository = async (groupId) => {
    try {
        const tasks = await Task.find(
            { 
                groups: { $in: [groupId] }
            }
        );
        return tasks;
    } catch (error) {
        throw error;
    }
}
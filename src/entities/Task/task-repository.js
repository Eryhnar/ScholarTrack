import Task from "./task-model";

export const createTaskRepository = async (newTask) => {
    try {
        const task = await Task.create(newTask);
        return task;
    } catch (error) {
        throw error;
    }
}
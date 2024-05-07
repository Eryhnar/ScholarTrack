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

export const getGroupTaskByIdRepository = async (groupId, taskId) => {
    try {
        const task = await Task.findOne(
            {
                _id: taskId,
                groups: { $in: [groupId] }
            }
        );
        return task;
    } catch (error) {
        throw error;
    }
}

export const editTaskRepository = async (groupId, taskId, newInfo) => {
    try {
        const editedTask = await Task.findOneAndUpdate(
            {
                _id: taskId,
                groups: { $in: [groupId] }
            },
            newInfo,
            {
                new: true
            }
        );
        return editedTask;
    } catch (error) {
        throw error;
    }
}

export const deleteTaskRepository = async (groupId, taskId) => {
    try {
        await Task.findOneAndDelete(
            {
                _id: taskId,
                groups: { $in: [groupId] }
            }
        );
    } catch (error) {
        throw error;
    }
}
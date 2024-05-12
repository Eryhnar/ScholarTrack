import { createTaskService, deleteTaskService, editTaskService, getGroupTaskByIdService, getGroupTasksService } from "./task-service.js";

export const createTask = async (req, res, next) => {
    try {
        const userId = req.tokenData.userId;
        const { groupId } = req.params;
        const taskInfo = req.body;
        const task = await createTaskService(userId, groupId, taskInfo);
        res.status(201).json(
            {
                success: true,
                message: "Task created successfully",
                data: task,
            }
        );
    } catch (error) {
        next(error);
    }
}

export const getGroupTasks = async (req, res, next) => {
    try {
        const userId = req.tokenData.userId;
        const { groupId } = req.params;
        const tasks = await getGroupTasksService(userId, groupId);
        res.status(200).json(
            {
                success: true,
                message: "Tasks fetched successfully",
                data: tasks,
            }
        );
    } catch (error) {
        next(error);
    }
}

export const getGroupTaskById = async (req, res, next) => {
    try {
        const userId = req.tokenData.userId;
        const { groupId, taskId } = req.params;
        const task = await getGroupTaskByIdService(userId, groupId, taskId);
        res.status(200).json(
            {
                success: true,
                message: "Task fetched successfully",
                data: task,
            }
        );
    } catch (error) {
        next(error);
    }
}

export const editTask = async (req, res, next) => {
    try {
        const userId = req.tokenData.userId;
        const { groupId, taskId } = req.params;
        const taskInfo = req.body;
        const task = await editTaskService(userId, groupId, taskId, taskInfo);
        res.status(200).json(
            {
                success: true,
                message: "Task edited successfully",
                data: task,
            }
        );
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const userId = req.tokenData.userId;
        const { groupId, taskId } = req.params;
        const task = await deleteTaskService(userId, groupId, taskId);
        res.status(200).json(
            {
                success: true,
                message: "Task deleted successfully",
                data: task,
            }
        );
    } catch (error) {
        next(error);
    }
}
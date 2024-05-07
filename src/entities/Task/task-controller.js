import { createTaskService } from "./task-service.js";

export const createTask = async (req, res) => {
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
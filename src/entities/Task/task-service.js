import { createTaskRepository } from "./task-repository.js";

export const createTaskService = async (userId, groupId, taskInfo) => {
    try {
        const { name, description, deadline, weight, optional, tags } = taskInfo;
        const newTask = {}

        if (!name) {
            throw new InvalidInputError(400, "Name is required");
        }
        newTask.name = name;

        if (!weight) {
            throw new InvalidInputError(400, "Weight is required");
        }
        newTask.weight = weight;

        if (description) newTask.description = description;
        if (deadline) newTask.deadline = deadline;
        if (optional) newTask.optional = optional;
        if (tags) newTask.tags = tags;

        const task = await createTaskRepository(newTask);
        return task;
    } catch (error) {
        throw error;
    }
}
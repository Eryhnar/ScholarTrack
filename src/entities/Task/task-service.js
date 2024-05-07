import InvalidInputError from "../../utils/errors/InvalidInputError.js";
import UnauthorizedError from "../../utils/errors/UnauthorizedError.js";
import { isUserAuthorizedForGroup } from "../Group/group-repository.js";
import { createTaskRepository, getGroupTasksRepository } from "./task-repository.js";

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

export const getGroupTasksService = async (userId, groupId) => {
    try {
        if (!groupId) {
            throw new InvalidInputError(400, "Please provide all required fields");
        }
        if (!(await isUserAuthorizedForGroup(userId, groupId))) {
            throw new UnauthorizedError(403, "You are not authorized to view this group");
        }
        const tasks = await getGroupTasksRepository(groupId);
        return tasks;
    } catch (error) {
        throw error;
    }
}
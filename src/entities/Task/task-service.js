import InvalidInputError from "../../utils/errors/InvalidInputError.js";
import UnauthorizedError from "../../utils/errors/UnauthorizedError.js";
import { isUserAuthorizedForGroup } from "../Group/group-repository.js";
import { createTaskRepository, getGroupTaskByIdRepository, getGroupTasksRepository } from "./task-repository.js";

export const createTaskService = async (userId, groupId, taskInfo) => {
    try {
        const { name, description, deadline, weight, optional, tags } = taskInfo;
        const newTask = {}

        if (!groupId) { // TODO remove once I implement add task to group to reuse task in multiple groups
            throw new InvalidInputError(400, "Please provide all required fields");
        }
        newTask.groups = [groupId]; // TODO remove once I implement add task to group to reuse task in multiple groups

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

        if (!(await isUserAuthorizedForGroup(userId, groupId))) {
            throw new UnauthorizedError(403, "You are not authorized to view this group");
        }

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

// TODO: IMPORTANT!! Unify checks into a single call to reduce db calls.
export const getGroupTaskByIdService = async (userId, groupId, taskId) => {
    try {
        if (!taskId) {
            throw new InvalidInputError(400, "Please provide all required fields");
        }

        if (!groupId) {
            throw new InvalidInputError(400, "Please provide all required fields");
        }

        if (!(await isUserAuthorizedForGroup(userId, groupId))) {
            throw new UnauthorizedError(403, "You are not authorized to view this group");
        }

        // not needed for now it will just return an empty data object
       
        // if (!(await groupExists(userId, groupId))) {
        //     throw new InvalidInputError(400, "Group does not exist");
        // }

        // if (!(await groupTaskExists(groupId, taskId))) {
        //     throw new InvalidInputError(400, "Task does not exist");
        // }

        const task = await getGroupTaskByIdRepository(groupId, taskId);
        return task;
    } catch (error) {
        throw error;
    }
}
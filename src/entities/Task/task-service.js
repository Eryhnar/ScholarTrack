import InvalidInputError from "../../utils/errors/InvalidInputError.js";
import UnauthorizedError from "../../utils/errors/UnauthorizedError.js";
import { isUserAuthorizedForGroup } from "../Group/group-repository.js";
import { createTaskRepository, deleteTaskRepository, editTaskRepository, getGroupTaskByIdRepository, getGroupTasksRepository } from "./task-repository.js";

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

        if (!weight || weight < 1 || weight > 100) {
            throw new InvalidInputError(400, "Weight is required and must be between 1 and 100");
        }
        // newTask.weight = weight/100;
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

export const editTaskService = async (userId, groupId, taskId, taskInfo) => {
    try {
        const { name, description, deadline, weight, optional, tags } = taskInfo;
        const newInfo = {};
        if (!groupId || !taskId) {
            throw new InvalidInputError(400, "Group id and task id are required");
        }
        if (name) newInfo.name = name;
        if (description) newInfo.description = description;
        if (deadline) newInfo.deadline = deadline;
        if (weight) {
            if (weight < 1 || weight > 100) {
                throw new InvalidInputError(400, "Weight must be between 1 and 100");
            }
            newInfo.weight = weight;
        }
        if (optional) newInfo.optional = optional;
        if (tags) newInfo.tags = tags;

        if (!(await isUserAuthorizedForGroup(userId, groupId))) {
            throw new UnauthorizedError(403, "You are not authorized to view this group");
        }

        const task = await editTaskRepository(groupId, taskId, newInfo);
        return task;
    } catch (error) {
        throw error;
    }
}

export const deleteTaskService = async (userId, groupId, taskId) => {
    try {
        if (!groupId || !taskId) {
            throw new InvalidInputError(400, "Group id and task id are required");
        }

        if (!(await isUserAuthorizedForGroup(userId, groupId))) {
            throw new UnauthorizedError(403, "You are not authorized to view this group");
        }

        // Todo: check if group and task exists

        await deleteTaskRepository(groupId, taskId);
    } catch (error) {
        throw error;
    }
}
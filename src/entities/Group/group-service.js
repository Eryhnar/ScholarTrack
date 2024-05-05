import InvalidInputError from "../../utils/errors/invalidInputError.js";
import { createGroupRepository, deleteGroupByIdRepository, editGroupByIdRepository, getGroupByIdRepository, getGroupsByUserIdRepository } from "./group-repository.js";
import { getUserByIdRepository } from "../User/user-repository.js";

export const createGroupService = async (authorId, groupData) => {
    try {
        const { name, level } = groupData;
        if (!name || !level) {
            throw new InvalidInputError(400, "Group name and level are required");
        }

        const author = getUserByIdRepository(authorId);
        if (!author) {
            throw new InvalidInputError(400, "Something went wrong, please try again later");
        }

        const group = await createGroupRepository(authorId, name, level);
        return group;
    } catch (error) {
        throw error;
    }
}

export const getGroupsByUserIdService = async (userId) => {
    try {
        const groups = await getGroupsByUserIdRepository(userId);
        return groups;
    } catch (error) {
        throw error;
    }
}

export const editGroupByIdService = async (userId, groupId, groupData) => {
    try {
        const { name, level } = groupData;
        const editedFields = {};
        if (name) {
            //validate
            editedFields.name = name;
        }

        if (level) {
            //validate
            editedFields.level = level;
        }

        const editedGroup = await editGroupByIdRepository(userId, groupId, editedFields);

        if (!editedGroup) {
            throw new InvalidInputError(400, "Something went wrong, please try again later");
        }

        return editedGroup;
    } catch (error) {
        throw error;
    }
}

export const deleteGroupByIdService = async (userId, groupId) => {
    try {
        await deleteGroupByIdRepository(userId, groupId);
    } catch (error) {
        throw error;
    }
}

export const getGroupByIdService = async (userId, groupId) => {
    try {
        if (!groupId) {
            throw new InvalidInputError(400, "Group id is required");
        }
        const group = await getGroupByIdRepository(userId, groupId);
        return group;
    } catch (error) {
        throw error;
    }
}
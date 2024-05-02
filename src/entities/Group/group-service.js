import InvalidInputError from "../../utils/errors/invalidInputError.js";
import { createGroupRepository, editGroupByIdRepository, getGroupsByUserIdRepository } from "./group-repository.js";
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
        if (!name || !level) {
            throw new InvalidInputError(400, "Group name and level are required");
        }

        // get group by id?
        const editedGroup = await editGroupByIdRepository(userId, groupId, groupData);

        if (!editedGroup) {
            throw new InvalidInputError(400, "Something went wrong, please try again later");
        }

        return editedGroup;
    } catch (error) {
        throw error;
    }
}
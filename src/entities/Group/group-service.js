import { createGroupRepository } from "./group-repository.js";

export const createGroupService = async (groupData) => {
    try {
        //check

        const group = await createGroupRepository(groupData);
        return group;
    } catch (error) {
        throw error;
    }
}
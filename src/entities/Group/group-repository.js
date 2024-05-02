import Group from "./group-model";

export const createGroupRepository = async (groupData) => {
    try {
        const group = await Group.create(groupData);
        return group;
    } catch (error) {
        throw error;
    }
}
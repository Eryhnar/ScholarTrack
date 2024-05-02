import Group from "./group-model.js";

export const createGroupRepository = async (authorId, name, level) => {
    try {
        const group = await Group.create({
            author: authorId,
            name,
            level,
        });
        return group;
    } catch (error) {
        throw error;
    }
}
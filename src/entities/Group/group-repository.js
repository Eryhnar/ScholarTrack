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

export const getGroupsByUserIdRepository = async (userId) => {
    try {
        const groups = await Group.find({ 
            $or: [
                { author: userId },
                { collaborators: userId }
            ]
        });
        return groups;
    } catch (error) {
        throw error;
    }
}
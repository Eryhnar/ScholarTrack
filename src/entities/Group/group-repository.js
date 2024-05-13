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

export const editGroupByIdRepository = async (userId, groupId, groupData) => {
    try {
        const editedGroup = await Group.findOneAndUpdate(
            {
                _id: groupId,
                $or: [
                    { author: userId },
                    { collaborators: userId }
                ]
            },
            groupData,
            {
                new: true
            }
        );
        return editedGroup;
    } catch (error) {
        throw error;
    }
}

export const deleteGroupByIdRepository = async (userId, groupId) => {
    try {
        await Group.findOneAndDelete(
            {
                _id: groupId,
                $or: [
                    { author: userId },
                    { collaborators: userId }
                ]
            },
        );
    } catch (error) {
        throw error;
    }
}

export const getGroupByIdRepository = async (userId, groupId) => {
    try {
        const group = await Group.findOne(
            {
                _id: groupId,
                $or: [
                    { author: userId },
                    { collaborators: userId }
                ]
            },
        );
        return group;
    } catch (error) {
        throw error;
    }
}

export const groupExists = async (userId, groupId) => {
    try {
        return await Group.exists({
            _id: groupId,
            $or: [
                { author: userId },
                { collaborators: userId }
            ]
        });
    } catch (error) {
        throw error;
    }
}

export const isUserAuthorizedForGroup = async (userId, groupId) => {
    try {
        return await Group.exists({
            _id: groupId,
            $or: [
                { author: userId },
                { collaborators: { $in: [userId] } }
            ]
        });
    } catch (error) {
        throw error;
    }
}
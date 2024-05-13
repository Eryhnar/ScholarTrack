import Group from '../../entities/Group/group-model.js';

const seedGroups = async (userIds, number) => {
    const groups = Array.from({ length: number }, (_, index) => ({
        name: `Group ${index + 1}`,
        author: userIds[Math.floor(Math.random() * userIds.length)],
        level: `Level ${index + 1}`,
        status: 'active'
    }));

    return await Group.create(groups);
};

export default seedGroups;
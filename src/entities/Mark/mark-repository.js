import Mark from "./mark-model.js";

export const createMarkRepository = async (markInfo) => {
    try {
        const mark = await Mark.create(
            markInfo
        );
        return mark;
    } catch (error) {
        throw error;
    }
}

export const getAllGroupMarksRepository = async (groupId) => {
    try {
        const marks = await Mark.find(
            {
                group: groupId
            }
        );
        return marks;
    } catch (error) {
        throw error;
    }
}

export const editStudentMarkRepository = async (markId, value) => {
    try {
        const mark = await Mark.findByIdAndUpdate(
            markId,
            {
                value
            },
            {
                new: true
            }
        );
        return mark;
    } catch (error) {
        throw error;
    }
}
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
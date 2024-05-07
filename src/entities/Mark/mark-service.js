import { isUserAuthorizedForGroup } from "../Group/group-repository";

export const createMarkService = async (userId, markInfo) => {
    try {
        const { student, task, group, value } = markInfo;
        if (!student || !task || !group || !value) {
            throw new InvalidInputError(400, "Please provide all required fields");
        }

        if (!(await isUserAuthorizedForGroup(userId, group))) {
            throw new UnauthorizedError(403, "You are not authorized to view this task");
        }

        const mark = await createMarkRepository(userId, markInfo);
        return mark;
    } catch (error) {
        throw error;
    }
}
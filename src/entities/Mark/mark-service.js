import InvalidInputError from "../../utils/errors/InvalidInputError.js";
import UnauthorizedError from "../../utils/errors/UnauthorizedError.js";
import { isUserAuthorizedForGroup } from "../Group/group-repository.js";
import { createMarkRepository } from "./mark-repository.js";

export const createMarkService = async (userId, markInfo) => {
    try {
        const { student, task, group, value } = markInfo;
        if (!student || !task || !group || !value) {
            throw new InvalidInputError(400, "Please provide all required fields");
        }

        if (!(await isUserAuthorizedForGroup(userId, group))) {
            throw new UnauthorizedError(403, "You are not authorized to view this task");
        }

        const mark = await createMarkRepository(markInfo);
        return mark;
    } catch (error) {
        throw error;
    }
}
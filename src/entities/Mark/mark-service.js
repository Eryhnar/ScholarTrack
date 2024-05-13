import InvalidInputError from "../../utils/errors/InvalidInputError.js";
import UnauthorizedError from "../../utils/errors/UnauthorizedError.js";
import { isUserAuthorizedForGroup } from "../Group/group-repository.js";
import { createMarkRepository, deleteStudentMarkRepository, editStudentMarkRepository, getAllGroupMarksRepository } from "./mark-repository.js";

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

export const getAllGroupMarksService = async (userId, groupId) => {
    try {
        if (!groupId) {
            throw new InvalidInputError(400, "Please provide all required fields");
        }

        if (!(await isUserAuthorizedForGroup(userId, groupId))) {
            throw new UnauthorizedError(403, "You are not authorized to view this group");
        }

        const marks = await getAllGroupMarksRepository(groupId);
        return marks;
    } catch (error) {
        throw error;
    }
}

export const editStudentMarkService = async (userId, groupId, markId, value) => {
    try {
        if (!groupId || !markId || !value) {
            throw new InvalidInputError(400, "Please provide all required fields");
        }

        if (!(await isUserAuthorizedForGroup(userId, groupId))) {
            throw new UnauthorizedError(403, "You are not authorized to view this group");
        }

        const mark = await editStudentMarkRepository(markId, value);
        return mark;
    } catch (error) {
        throw error;
    }
}

export const deleteStudentMarkService = async (userId, groupId, markId) => {
    try {
        if (!groupId || !markId) {
            throw new InvalidInputError(400, "Please provide all required fields");
        }

        if (!(await isUserAuthorizedForGroup(userId, groupId))) {
            throw new UnauthorizedError(403, "You are not authorized to view this group");
        }

        await deleteStudentMarkRepository(markId);
    } catch (error) {
        throw error;
    }
}

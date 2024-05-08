import { createMarkService, deleteStudentMarkService, editStudentMarkService, getAllGroupMarksService } from "./mark-service.js";

export const createMark = async (req, res, next) => {
    try {
        const userId = req.tokenData.userId;
        const { groupId, taskId, studentId } = req.params;
        const markInfo = {};
        markInfo.group = groupId;
        markInfo.task = taskId;
        markInfo.student = studentId;
        markInfo.value = req.body.value;
        const mark = await createMarkService(userId, markInfo);
        res.status(201).json(
            {
                success: true,
                message: "Mark created successfully",
                data: mark,
            }
        );
    } catch (error) {
        next(error);
    }
}

export const getAllGroupMarks = async (req, res, next) => {
    try {
        const userId = req.tokenData.userId;
        const { groupId } = req.params;
        const marks = await getAllGroupMarksService(userId, groupId);
        res.status(200).json(
            {
                success: true,
                message: "Marks fetched successfully",
                data: marks,
            }
        );
    } catch (error) {
        next(error);
    }
}

export const editStudentMark = async (req, res, next) => {
    try {
        const userId = req.tokenData.userId;
        const { groupId, markId } = req.params;
        const value = req.body.value;
        const mark = await editStudentMarkService(userId, groupId, markId, value);
        res.status(200).json(
            {
                success: true,
                message: "Mark edited successfully",
                data: mark,
            }
        );
    } catch (error) {
        next(error);
    }
}

export const deleteStudentMark = async (req, res, next) => {
    try {
        const userId = req.tokenData.userId;
        const { groupId, markId } = req.params;
        await deleteStudentMarkService(userId, groupId, markId);
        res.status(200).json(
            {
                success: true,
                message: "Mark deleted successfully",
            }
        );
    } catch (error) {
        next(error);
    }
}
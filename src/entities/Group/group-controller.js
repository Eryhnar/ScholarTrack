import { createGroupService, deleteGroupByIdService, editGroupByIdService, getGroupsByUserIdService } from "./group-service.js";

export const createGroup = async (req, res, next) => {
    try {
        const group = await createGroupService(req.tokenData.userId, req.body);
        res.status(201).json(
            {
                success: true,
                message: "Group created successfully",
                data: group,
            }
        );
    } catch (error) {
        next(error);
    }
}

export const getOwnGroups = async (req, res, next) => {
    try {
        const groups = await getGroupsByUserIdService(req.tokenData.userId);
        res.status(200).json(
            {
                success: true,
                message: "Groups fetched successfully",
                data: groups,
            }
        );
    } catch (error) {
        next(error);
    }
}

export const editOwnGroupById = async (req, res, next) => {
    try {
        const editedGroup = await editGroupByIdService(req.tokenData.userId, req.params.groupId, req.body);
        res.status(200).json(
            {
                success: true,
                message: "Group updated successfully",
                data: editedGroup,
            }
        );
    } catch (error) {
        next(error);
    }
}

export const deleteOwnGroupById = async (req, res, next) => {
    try {
        await deleteGroupByIdService(req.tokenData.userId, req.params.groupId);
        res.status(200).json(
            {
                success: true,
                message: "Group deleted successfully",
            }
        );
    } catch (error) {
        next(error);
    }
}
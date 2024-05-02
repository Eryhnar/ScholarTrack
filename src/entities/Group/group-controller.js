import { createGroupService, getGroupsByUserIdService } from "./group-service.js";

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

export const getGroupsByUserId = async (req, res, next) => {
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
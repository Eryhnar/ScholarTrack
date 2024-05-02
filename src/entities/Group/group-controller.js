import { createGroupService } from "./group-service.js";

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
import { updateUserProfileService } from "./user-service.js";

export const updateUserProfile = async (req, res, next) => {
    try {
        const updatedUser = await updateUserProfileService(req);
        res.status(200).json(
            {
                success: true,
                message: "User updated successfully",
                data: updatedUser,
            }
        );
    } catch (error) {
        next(error);
    }
}
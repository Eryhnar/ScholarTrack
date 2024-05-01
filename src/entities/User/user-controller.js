import { updateUserProfileService } from "./user-service.js";

export const updateUserProfile = async (req, res) => {
    try {
        const updatedUser = await updateUserProfileService(req.user._id, req.body);
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
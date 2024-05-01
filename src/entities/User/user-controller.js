import { changePasswordService, updateUserProfileService } from "./user-service.js";

export const updateUserProfile = async (req, res, next) => {
    try {
        const {_id, name, role, ...other} = await updateUserProfileService(req);
        const updatedUser = {id: _id, name, role};
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

export const changePassword = async (req, res, next) => {
    try {
        await changePasswordService(req);
        res.status(200).json(
            {
                success: true,
                message: "Password changed successfully",
            }
        );
    } catch (error) {
        next(error);
    }
}
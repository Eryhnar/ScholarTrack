import { changePasswordService, suspendUserService, updateUserProfileService } from "./user-service.js";

export const updateUserProfile = async (req, res, next) => {
    try {
        const {_id, name} = await updateUserProfileService(req); //TODO move them here this is not working
        const updatedUser = {id: _id, name};
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

export const suspendUser = async (req, res, next) => {
    try {
        await suspendUserService(req);
        res.status(200).json(
            {
                success: true,
                message: "User suspended successfully",
            }
        );
    } catch (error) {
        next(error);
    }
}
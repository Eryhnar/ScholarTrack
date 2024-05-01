import InvalidInputError from "../../utils/errors/invalidInputError.js";
import comparePassword from "../../utils/treatment-utils.js/comparePassword.js";
import hashPassword from "../../utils/treatment-utils.js/hashPassword.js";
import isValidEmail from "../../utils/validators/isValidEmail.js";
import isValidName from "../../utils/validators/isValidName.js";
import isValidPassword from "../../utils/validators/isValidPassword.js";
import { getUserWithPasswordRepository, updateUserByIdRepository } from "./user-repository.js";

export const updateUserProfileService = async (req, res) => {
    try {
        const userId = req.tokenData.userId;
        const { name, email } = req.body;
        const updatedFields = {};

        if (name) {
            if (!isValidName(name)) {
                throw new InvalidInputError(400, "Name must be between 3 and 50 characters and contain only letters and spaces");
            }
            updatedFields.name = name;
        }

        if (email) {
            if (!isValidEmail(email)) {
                throw new InvalidInputError(400, "Invalid email");
            }
            updatedFields.email = email;
        }
        const updatedUser = await updateUserByIdRepository(userId, updatedFields);
        return updatedUser;

    } catch (error) {
        throw error;
    }
}

export const changePasswordService = async (req, res) => {
    try {
        const userId = req.tokenData.userId;
        const { currentPassword, newPassword, confirmNewPassword } = req.body;

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            throw new InvalidInputError(400, "All fields are required");
        }

        if (newPassword !== confirmNewPassword) {
            throw new InvalidInputError(400, "Passwords do not match");
        }
        
        if (!isValidPassword(newPassword)) {
            throw new InvalidInputError(400, "Invalid password");
        }

        const user = await getUserWithPasswordRepository(userId);

        if (!await comparePassword(currentPassword, user.password)) {
            throw new InvalidInputError(400, "Invalid password");
        }

        const hashedPassword = await hashPassword(newPassword);
        await updateUserByIdRepository(userId, { password: hashedPassword });
    } catch (error) {
        throw error;
    }
}
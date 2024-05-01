import InvalidInputError from "../../utils/errors/invalidInputError.js";
import isValidEmail from "../../utils/validators/isValidEmail.js";
import { updateUserByIdRepository } from "./user-repository.js";

export const updateUserProfileService = async (req, res) => {
    try {
        const userId = req.tokenData.userId;
        const { name, email } = req.body;
        const updatedFields = {};

        if (name && !isValidName(name)) {
            throw new InvalidInputError(400, "Invalid name");
        }
        updatedFields.name = name;

        if (email && !isValidEmail(email)) {
            throw new InvalidInputError(400, "Invalid email");
        }
        updatedFields.email = email;
        const updatedUser = await updateUserByIdRepository(userId, updatedFields);
        return updatedUser;

    } catch (error) {
        throw error;
    }
}
import InvalidInputError from "../utils/errors/invalidInputError.js";
import hashPassword from "../utils/treatment-utils.js/hashPassword.js";
import isValidEmail from "../utils/validators/isValidEmail.js";
import isValidPassword from "../utils/validators/isValidPassword.js";
import { registerUser } from "./auth-repository.js";

export const registerService = async (data) => {
    try {
        const  {name, email, password}= data;

        if (!name || !email || !password) {
            throw new Error('Missing required fields');
        }

        //TODO verifications
        if (!isValidEmail(email)) {
            throw new InvalidInputError(400, "Invalid email");
        }

        if (!isValidPassword(password)) {
            throw new InvalidInputError(400, "Password must be between 8 and 16 characters, contain at least one lowercase letter, one uppercase letter and one number");
        }

        //TODO hash password
        const hashedPassword = await hashPassword(password);

        registerUser(name, email, hashedPassword);
    } catch (error) {
        throw error;
    }
}
    
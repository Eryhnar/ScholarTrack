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
            throw new Error('Invalid email');
        }

        if (!isValidPassword(password)) {
            throw new Error('Invalid password');
        }

        //TODO hash password
        const hashedPassword = await hashPassword(password);

        registerUser(name, email, hashedPassword);
    } catch (error) {
        throw error;
    }
}
    
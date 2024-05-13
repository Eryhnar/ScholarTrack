import jwt from "jsonwebtoken";
import UnauthorizedError from "../utils/errors/UnauthorizedError.js";
import InvalidInputError from "../utils/errors/InvalidInputError.js";
import hashPassword from "../utils/treatment-utils/hashPassword.js";
import isValidEmail from "../utils/validators/isValidEmail.js";
import isValidPassword from "../utils/validators/isValidPassword.js";
import { getUserToLogin, registerUser } from "./auth-repository.js";
import comparePassword from "../utils/treatment-utils/comparePassword.js";
import isValidName from "../utils/validators/isValidName.js";

export const registerService = async (data) => {
    try {
        const  {name, email, password}= data;

        if (!name || !email || !password) {
            throw new Error('Missing required fields');
        }
        if (!isValidName(name)) {
            throw new InvalidInputError(400, "Name must be between 3 and 50 characters and contain only letters and spaces");
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

export const loginService = async (data) => {
    try {
        const { email, password } = data;

        if (!email || !password) {
            throw new InvalidInputError(400, "All fields are required");
        }

        const user = await getUserToLogin(email);
        if (!user) {
            throw new UnauthorizedError(401, "Invalid email or password");
        }

        if (!await comparePassword(password, user.password)) {
            throw new UnauthorizedError(401, "Invalid email or password");
        }

        const token = jwt.sign(
            {
                userId: user._id,
                name: user.name,
                role: user.role,
                // profilePicture: user.profilePicture,
            },
            process.env.JWT_SECRET,
            {
                // expiresIn: "5h",
            }
        );

        // const userName = user.name;
        

        return {
            token,
            user
        };

    } catch (error) {
        throw error;
    }
}

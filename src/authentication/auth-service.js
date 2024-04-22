import { registerUser } from "./auth-repository.js";

export const registerService = async (data) => {
    try {
        const  {name, email, password}= data;

        if (!name || !email || !password) {
            throw new Error('Missing required fields');
        }

        //TODO verifications

        //TODO hash password

        registerUser(name, email, password);
    } catch (error) {
        throw error;
    }
}
    
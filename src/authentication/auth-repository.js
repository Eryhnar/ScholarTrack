import User from "../entities/User/user-model.js";

export const registerUser = async (name, email, password) => {
    try {
        await User.create(
            {
                name,
                email,
                password,
            }
        );
    } catch (error) {
        throw error;
    }
}

export const getUserToLogin = async (email) => {
    try {
        const user = await User.findOne(
            { 
                email 
            },
            "+role +password"
        );
        return user;
    } catch (error) {
        throw error;
    }
}

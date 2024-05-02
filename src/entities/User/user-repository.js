import User from "./user-model.js";

export const updateUserByIdRepository = async (id, updatedFields) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new NotFoundError(404, "Something went wrong");
        }

        const updatedUser = await User.findByIdAndUpdate(
            {
                _id: id
            },
            updatedFields,
            {
                new: true
            },
        ).select("+role");
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

export const getUserWithPasswordRepository = async (id) => {
    try {
        const user = await User.findById(id).select("+password");
        if (!user) {
            throw new NotFoundError(404, "User not found");
        }
        return user;
    } catch (error) {
        throw error;
    }
}

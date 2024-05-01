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
            }
        )
        return updatedUser;
    } catch (error) {
        throw error;
    }
}

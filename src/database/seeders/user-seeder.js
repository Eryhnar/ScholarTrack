import User from "../../entities/User/user-model.js"
import hashPassword from "../../utils/treatment-utils/hashPassword.js"

const seedUsers = async () => {
    const users = [
        {
            name: "user",
            email: "user@user.com",
            password: await hashPassword("Aa123456"),
        }
    ]
    return await User.create(users)
}

export default seedUsers;
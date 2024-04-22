import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin", "superadmin"],
            required: true,
            default: "user",
        },
    },
    {
        timestamps: true,
    }
);

const User = model('User', userSchema);

export default User;
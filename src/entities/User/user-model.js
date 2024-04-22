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
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        role: {
            type: String,
            enum: ["user", "admin", "superadmin"],
            required: true,
            default: "user",
            select: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const User = model('User', userSchema);

export default User;
import { Schema, model } from "mongoose";

const studentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        groups: [
            {
                type: Schema.Types.ObjectId,
                ref: "Group",
            },
        ],
        status: {
            type: String,
            enum: ["active", "archived"],
            required: true,
            default: "active",
        },
        age: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const Student = model("Student", studentSchema);

export default Student;
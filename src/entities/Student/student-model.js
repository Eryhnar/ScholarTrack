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
        marks: [
            {
                type: Schema.Types.ObjectId,
                ref: "Mark",
            },
        ],
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
        attendance: [
            {
                type: Schema.Types.ObjectId,
                ref: "Attendance",
            },
        ],
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
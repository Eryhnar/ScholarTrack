import { Schema, model } from "mongoose";

const markSchema = new Schema(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        task: {
            type: Schema.Types.ObjectId,
            ref: "Task",
            required: true,
        },
        group: {
            type: Schema.Types.ObjectId,
            ref: "Group",
            required: true,
        },
        value: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

markSchema.index({ student: 1, task: 1, group: 1 }, { unique: true });

const Mark = model("Mark", markSchema);

export default Mark;
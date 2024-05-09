import { Schema, model } from "mongoose";

const attendanceSchema = new Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        student: {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        group: {
            type: Schema.Types.ObjectId,
            ref: "Group",
            required: true,
        },
        present: {
            type: Boolean,
            required: true,
            default: false, //might not be needed
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

attendanceSchema.index({ student: 1, date: 1, group: 1 }, { unique: true });

const Attendance = model("Attendance", attendanceSchema);

export default Attendance;
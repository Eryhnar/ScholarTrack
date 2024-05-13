import { Schema, model } from "mongoose";

const taskSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        deadline: {
            type: Date,
        },
        groups: [
            {
                type: Schema.Types.ObjectId,
                ref: "Group",
            },
        ],
        weight: {
            type: Schema.Types.Mixed,
            required: true,
            validate: {
                validator: (v) => {
                    return typeof v === 'string' || v === 'auto'; // TODO change to number or run validations in service
                },
                message: props => `${props.value} is not a valid weight!`
            },
            // TODO add default "auto"
        },
        optional: {
            type: Boolean,
            required: true,
            default: false,
        },
        tags: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const Task = model("Task", taskSchema);

export default Task;
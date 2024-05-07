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
        weight: {
            type: Schema.Types.Mixed,
            required: true,
            validate: {
                validator: (v) => {
                    return typeof v === 'number' || v === 'auto';
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
    }
)

const Task = model("Task", taskSchema);

export default Task;
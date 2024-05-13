import { Schema, model } from "mongoose";

const groupSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        collaborators: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        level: {
            type: String,
            required: true,
        },
        gradingScale: {
            grade: {
                type: String,
            },
            range: {
                min: {
                    type: Number,
                },
                max: {
                    type: Number,
                }
            },
        },
        
        status: {
            type: String,
            enum: ["active", "archived"],
            required: true,
            default: "active",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const Group = model("Group", groupSchema);

export default Group;
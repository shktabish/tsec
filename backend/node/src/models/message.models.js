import mongoose from "mongoose"

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        message: {
            type: String,
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat"
        },
        file: [{
            type: String
        }]
    },
    {
        timestamps: true
    }
)

const Message = mongoose.model("Message", messageSchema)

export default Message
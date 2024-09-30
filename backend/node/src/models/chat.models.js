import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        picture: {
            type: String,
            required: true
        },
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        isGroup: {
            type: Boolean,
            default: false
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

const Chat = mongoose.model("Chat", chatSchema)

export default Chat
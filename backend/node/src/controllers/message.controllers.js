import Chat from "../models/chat.models.js"
import Message from "../models/message.models.js"

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const sender = req.user._id
        
        if (!message) {
            return res.status(400).json({message: "Message is required"})
        }

        const chat = await Chat.findById(req.params.chatId)

        if(!chat) {
            return res.status(404).json({message: "Chat not found"})
        }

        const newMessage = await Message.create({
            message,
            sender,
            chat
        })

        if(!newMessage) {
            return res.status(400).json({message: "There was an error in sending the message"})
        }

        const messageSent  = await Message.findById(newMessage._id)
        .populate("sender", "name avatar")
        .populate("chat", "name picture users")

        await Chat.findByIdAndUpdate(req.params.chatId, {lastMessage: newMessage._id})

        return res.status(200).json(messageSent)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "There was an error in sending the message"})
    }
}

export const getAllMessages = async (req, res) => {
    try {
        const chatId = req.params.chatId

        const messages = await Message.find({chat: chatId})
        .populate("sender", "name avatar")
        .populate("chat", "name picture users")
        .sort("-createdAt")

        if(!messages) {
            return res.status(404).json({message: "No messages found"})
        }

        return res.status(200).json(messages)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "There was an error in fetching messages"})
    }
}
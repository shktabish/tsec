import Chat from "../models/chat.models.js"

import { User } from "../models/user.model.js"

export const createOrGetChat = async (req, res) => {
    try {
        const { receiverId } = req.params;
        const userId = req.user._id;

        console.log(receiverId, userId);

        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log('Receiver:', receiver); // Log the receiver details

        if (receiverId.toString() === userId.toString()) {
            return res.status(400).json({ message: "You cannot send a message to yourself" });
        }

        const userChat = await Chat.findOne({ users: { $all: [userId, receiverId] } })
            .populate("users", "first_name last_name avatar")
            .populate("lastMessage", "sender message createdAt");

        if (userChat) {
            return res.status(200).json({ chat: userChat });
        }

        // Ensure receiver.name is available
        const newChat = await Chat.create({
            name: receiver.name || "Unnamed Chat", // Default name if not available
            picture: receiver.avatar,
            users: [userId, receiverId],
        });

        const chat = await Chat.findById(newChat._id)
            .populate("users", "name avatar")
            .populate("lastMessage", "sender message createdAt");

        return res.status(200).json({ chat });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "There was an error in fetching/creating the chat" });
    }
};


export const getChat = async (req, res) => {
    try {
        const { chatId } = req.params

        const chat = await Chat.findById(chatId)
        .populate("users", "name avatar")
        .populate("lastMessage", "sender message createdAt")

        if(!chat) {
            return res.status(404).json({ message: "Chat not found" })
        }

        res.status(200).json({ chat })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error while fetching the chat" })
    }

}

export const getAllChats = async (req, res) => {
    try {
        const userId = req.user._id

        const chats = await Chat.find({ users: userId })
        .populate("users", "first_name last_name avatar")
        .populate("lastMessage", "sender message createdAt")

        res.status(200).json({ chats })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error while fetching the chats" })
    }
}

export const deleteChat = async (req, res) => {
    try {
        const { chatId } = req.params

        const chat = await Chat.findById(chatId)
        if(!chat) {
            return res.status(404).json({ message: "Chat not found" })
        }

        await Chat.deleteOne({_id: chatId})

        res.status(200).json({ message: "Chat deleted" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error while deleting the chat" })
    }
}
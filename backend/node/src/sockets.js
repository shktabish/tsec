const socketUtility = (socket) => {
    socket.on("join", (userId) => {
        socket.join(userId)
        console.log("User joined with id: ", userId)
    })

    socket.on("joinChat", (chatId) => {
        socket.join(chatId)
        console.log("User joined chat with id: ", chatId)
    })

    socket.on("sendMessage", (message) => {
        const users = message.sender._id
        const receiver = message.receiver._id
        socket.in(receiver).emit("receiveMessage", message)
        socket.emit("updateLastMessage", message.message)
    })
}

export default socketUtility
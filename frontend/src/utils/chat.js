export const getUser = (chatUsers, userId) => {
    return chatUsers.filter((user) => user._id !== userId)[0]
}
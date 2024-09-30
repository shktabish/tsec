import { useEffect, useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Send } from 'lucide-react'
import api from '@/utils/axios'
import { useUser } from '@/context/UserContext'
import { getUser } from '@/utils/chat'
import io from 'socket.io-client'

const socket = io('http://localhost:8000') // Connect to the socket server

export default function ChatPage() {
  const [students, setStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [chats, setChats] = useState([])
  const [chatId, setChatId] = useState('')
  const { user } = useUser() // Retrieve the current user information
  const messageEndRef = useRef(null) // To scroll to the latest message

  // Fetch chats on component mount
  useEffect(() => {
    const fetchChats = async () => {
      const response = await api.get("/chat/getAllChats")
      setChats(response.data.chats)
    }

    fetchChats()

    // Join the user's socket room after the component mounts
    socket.emit("join", user?._id) // Use optional chaining in case user is not yet defined

    // Listen for incoming messages from the socket server
    socket.on("receiveMessage", (message) => {
      if (message?.chatId === chatId) {
        setMessages((prevMessages) => [...prevMessages, message])
      }
    })

    // Clean up socket listeners on unmount
    return () => {
      socket.off("receiveMessage")
    }
  }, [chatId, user?._id]) // Use optional chaining here as well

  const handleStudentSelect = async (student) => {
    setSelectedStudent(student)
    setChatId(student?.id) // Optional chaining for student ID

    // Join the selected chat room
    socket.emit("joinChat", student?.id) // Optional chaining for student ID

    // Fetch messages for the selected student
    const response = await api.get(`/message/getMessages/${student?.id}`) // Optional chaining for student ID
    setMessages(response.data)
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
  
    if (newMessage.trim() !== '' && selectedStudent) {
      const newMsg = {
        message: newMessage,
        chatId: chatId,
        senderId: user?._id // Use optional chaining here as well
      }
  
      // Optimistic UI update
      setMessages([...messages, newMsg])
      setNewMessage('')
  
      // Send the message to the backend API
      await api.post(`/message/sendMessage/${chatId}`, { message: newMsg.message, chatId })
  
      // Get the receiver's ID
      const currentChat = chats.find(chat => chat?._id === chatId)
      const receiverId = getReceiverId(currentChat) // Make sure you're passing the current chat here
  
      // Emit the message to the socket server
      socket.emit("sendMessage", {
        message: newMsg.message,
        chatId: chatId,
        sender: { _id: user?._id }, // Optional chaining for the user ID
        receiver: { _id: receiverId } // Use the receiver ID
      })
    }
  }  

  const getName = (chat) => {
    const otherUser = chat?.users?.find((u) => u?._id !== user?._id) // Optional chaining for user ID
    return otherUser ? otherUser?.name : 'Unknown User'
  }

  const getReceiverId = (chat) => {
    const otherUser = chat?.users?.find((u) => u?._id !== user?._id)
    return otherUser?._id
  }  

  const getAvatar = (chat) => {
    const otherUser = chat?.users?.find((u) => u?._id !== user?._id) // Optional chaining for user ID
    return otherUser?.avatar ? otherUser.avatar : '/placeholder.svg?height=40&width=40'
  }

  // Scroll to the bottom of messages when new messages arrive
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="container mx-auto p-4 h-screen flex">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>{selectedStudent ? `Chat with ${selectedStudent?.name}` : 'No students to chat with'}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-[calc(100vh-8rem)]">
          <ScrollArea className="flex-1 mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${message?.senderId === user?._id ? 'text-right' : 'text-left'}`} // Optional chaining for message sender ID
              >
                <div className={`inline-block p-2 rounded-lg ${message?.senderId === user?._id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  {message?.message}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{message?.timestamp}</div> {/* Optional chaining for timestamp */}
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </ScrollArea>
          <div className="flex">
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
              className="flex-1 mr-2"
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-1/3 ml-4">
        <CardHeader>
          <CardTitle>Connected Students</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {chats.map((chat) => {
              const otherUser = getUser(chat?.users, user?._id) // Optional chaining for users

              const lastMessageText = typeof chat?.lastMessage === 'object' && chat?.lastMessage !== null
                ? chat?.lastMessage?.message
                : chat?.lastMessage || 'No messages yet'

              return (
                <div key={chat?._id} className="mb-4"> {/* Optional chaining for chat ID */}
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleStudentSelect({
                      id: chat?._id, // Optional chaining for chat ID
                      name: `${otherUser?.first_name} ${otherUser?.last_name}`, // Optional chaining for user name
                      avatar: otherUser?.avatar // Optional chaining for avatar
                    })}
                  >
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={otherUser?.avatar} /> {/* Optional chaining for avatar */}
                      <AvatarFallback>{`${otherUser?.first_name[0]}${otherUser?.last_name[0]}`}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <div className="font-semibold">{`${otherUser?.first_name} ${otherUser?.last_name}`}</div>
                      <div className="text-sm text-muted-foreground">{lastMessageText}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{new Date(chat?.updatedAt).toLocaleString()}</div> {/* Optional chaining for updatedAt */}
                  </Button>
                  <Separator className="my-2" />
                </div>
              )
            })}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

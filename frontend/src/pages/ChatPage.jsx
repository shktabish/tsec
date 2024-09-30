import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Send } from 'lucide-react'

const initialStudents = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: '/placeholder.svg?height=40&width=40',
    lastMessage: 'Thanks for the help!',
    lastMessageTime: '10:30 AM'
  },
  {
    id: '2',
    name: 'Bob Smith',
    avatar: '/placeholder.svg?height=40&width=40',
    lastMessage: 'When is our next session?',
    lastMessageTime: 'Yesterday'
  },
  {
    id: '3',
    name: 'Carol Williams',
    avatar: '/placeholder.svg?height=40&width=40',
    lastMessage: 'I completed the assignment',
    lastMessageTime: 'Monday'
  }
]

const initialMessages = [
  {
    id: '1',
    senderId: '1',
    text: 'Hi mentor, I have a question about the last lesson.',
    timestamp: '10:00 AM'
  },
  {
    id: '2',
    senderId: 'mentor',
    text: 'Sure, Alice. What would you like to know?',
    timestamp: '10:05 AM'
  },
  {
    id: '3',
    senderId: '1',
    text: 'I didn\'t quite understand the concept of state management in React. Could you explain it again?',
    timestamp: '10:10 AM'
  },
  {
    id: '4',
    senderId: 'mentor',
    text: 'Of course! State management in React is about handling the data that can change over time in your application...',
    timestamp: '10:15 AM'
  },
  {
    id: '5',
    senderId: '1',
    text: 'Thanks for the help!',
    timestamp: '10:30 AM'
  }
]

export default function ChatPage() {
  const [students, setStudents] = useState(initialStudents)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState('')

  const handleStudentSelect = (student) => {
    setSelectedStudent(student)
  }

  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && selectedStudent) {
      const newMsg = {
        id: (messages.length + 1).toString(),
        senderId: 'mentor',
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([...messages, newMsg])
      setNewMessage('')

      // Update last message for the selected student
      setStudents(students.map(student => 
        student.id === selectedStudent.id 
          ? { ...student, lastMessage: newMessage, lastMessageTime: 'Just now' } 
          : student
      ))
    }
  }

  return (
    <div className="container mx-auto p-4 h-screen flex">

      <Card className="flex-1">
        <CardHeader>
          <CardTitle>{selectedStudent ? `Chat with ${selectedStudent.name}` : 'No students to chat with'}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-[calc(100vh-8rem)]">
          <ScrollArea className="flex-1 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${message.senderId === 'mentor' ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.senderId === 'mentor' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}
                >
                  {message.text}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{message.timestamp}</div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex">
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
            {students.map((student) => (
              <div key={student.id} className="mb-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleStudentSelect(student)}
                >
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback>{student.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{student.name}</div>
                    <div className="text-sm text-muted-foreground">{student.lastMessage}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{student.lastMessageTime}</div>
                </Button>
                <Separator className="my-2" />
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

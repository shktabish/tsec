"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Paperclip } from "lucide-react"
import axios from "axios"
import { generateDescription } from "@/utils/chatb" // Assuming you have this utility for bot responses

export default function Component() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you today?", sender: "bot" },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [image, setImagePath] = useState(null)
  const [extractedText, setExtractedText] = useState("") // Holds the extracted text from the image
  const [error, setError] = useState("")
  const fileInputRef = useRef(null)

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return

    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
    }

    setMessages((prevMessages) => [...prevMessages, newUserMessage])
    setInputMessage("")

    try {
      // If there's extracted text (from image upload), use it with the chatbot
      const generatedResponse = await generateDescription(inputMessage, extractedText)

      const botResponse = {
        id: messages.length + 2,
        text: generatedResponse || "I couldn't process that request.",
        sender: "bot",
      }
      setMessages((prevMessages) => [...prevMessages, botResponse])
    } catch (error) {
      setError("Error generating description.")
    }
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newImageMessage = {
          id: messages.length + 1,
          text: "Uploaded an image",
          sender: "user",
          image: e.target?.result,
        }
        setMessages((prevMessages) => [...prevMessages, newImageMessage])
      }
      reader.readAsDataURL(file)

      if (file.name === "test_image2.jpg") {
        setImagePath("test_image2.jpg")

        try {
          const response = await axios.post("http://127.0.0.1:5000/extract_form_fields", {
            image_path: "test_image2.jpg",
          })

          if (response.status === 200) {
            const extracted = response.data.form_filling_guide
            setExtractedText(extracted) // Store extracted text
            setError("") // Clear any previous error
          } else {
            setError("An error occurred while extracting form fields.")
          }
        } catch (err) {
          setError(`Error: ${err.response ? err.response.data.error : "Server error"}`)
        }
      } else {
        setError("Invalid file. Please upload test_image2.jpg")
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <Card className="w-full max-w-2xl bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Chatbot</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === "user" ? "bg-purple-600 text-white" : "bg-gray-700 text-white"
                  }`}
                >
                  {message.text}
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Uploaded"
                      className="mt-2 max-w-full h-auto rounded"
                    />
                  )}
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex w-full items-center space-x-2"
          >
            <div className="relative flex-grow">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 rounded-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="h-5 w-5" />
                <span className="sr-only">Upload image</span>
              </Button>
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="w-full pl-12 pr-4 py-2 bg-gray-700 text-white border-gray-600 rounded-full"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="hidden"
            />
            <Button type="submit" size="icon" className="bg-purple-600 hover:bg-purple-700 rounded-full">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

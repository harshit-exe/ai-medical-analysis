"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, AlertTriangle, Stethoscope, Activity, HelpCircle, Image } from "lucide-react"
import { useGroqAI } from "@/hooks/useGroqAI"
import { RiskAssessment } from "@/components/RiskAssessment"
import { ImageUploader } from "@/components/ImageUploader"

export default function ChatBot() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const scrollAreaRef = useRef(null)
  const { analyzeCancerRisk, getGeneralMedicalAdvice, checkSymptoms, isLoading, error } = useGroqAI()

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [scrollAreaRef]) //Corrected dependency

  const handleSend = async (message = input) => {
    if (message.trim()) {
      const userMessage = { text: message, sender: "user" }
      setMessages((prev) => [...prev, userMessage])
      setInput("")

      let response
      if (message.toLowerCase().includes("cancer") || message.toLowerCase().includes("tumor")) {
        response = await analyzeCancerRisk(message, "No specific medical history provided.")
      } else if (message.toLowerCase().includes("symptom")) {
        response = await checkSymptoms(message)
      } else {
        response = await getGeneralMedicalAdvice(message)
      }

      const botMessage = { text: response, sender: "bot" }
      setMessages((prev) => [...prev, botMessage])
    }
  }

  const handleImageText = async (text) => {
    setMessages((prev) => [...prev, { text: `Extracted text from image: ${text}`, sender: "user" }])
    await handleSend(text)
  }

  const renderMessage = (message, index) => {
    const isBot = message.sender === "bot"
    const avatarIcon = isBot ? <Bot size={24} /> : <User size={24} />
    const messageClass = isBot ? "bg-gray-200" : "bg-blue-500 text-white"

    return (
      <div key={index} className={`flex items-start mb-4 ${isBot ? "justify-start" : "justify-end"}`}>
        {isBot && (
          <Avatar className="mr-2">
            <AvatarFallback>{avatarIcon}</AvatarFallback>
          </Avatar>
        )}
        <div className={`p-3 rounded-lg ${messageClass}`}>
          {message.text}
          {isBot && message.text.includes("Risk Level:") && (
            <RiskAssessment riskLevel={message.text.split("Risk Level:")[1].trim()} />
          )}
        </div>
        {!isBot && (
          <Avatar className="ml-2">
            <AvatarFallback>{avatarIcon}</AvatarFallback>
          </Avatar>
        )}
      </div>
    )
  }

  const quickActions = [
    { icon: <Stethoscope size={18} />, text: "Check my symptoms", action: () => handleSend("Check my symptoms") },
    { icon: <Activity size={18} />, text: "Assess cancer risk", action: () => handleSend("Assess my cancer risk") },
    {
      icon: <HelpCircle size={18} />,
      text: "General health advice",
      action: () => handleSend("Give me general health advice"),
    },
    // { icon: <Image size={18} />, text: "Upload Image", action: () => document.getElementById("image-upload")?.click() },
  ]

  return (
    <div className="container mx-auto mt-10 max-w-2xl h-[600px] flex flex-col">
      <Card className="flex-grow flex flex-col">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Interactive Medical AI Assistant</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <ScrollArea className="flex-grow pr-4" ref={scrollAreaRef}>
            {messages.map(renderMessage)}
            {isLoading && (
              <div className="flex items-center justify-center">
                <Bot className="animate-spin h-5 w-5 mr-3" />
                Processing...
              </div>
            )}
            {error && (
              <div className="flex items-center justify-center text-red-500">
                <AlertTriangle className="h-5 w-5 mr-2" />
                {error}
              </div>
            )}
          </ScrollArea>
          {/* <ImageUploader onTextExtracted={handleImageText} />  */}
          <div className="flex flex-wrap justify-center gap-2 my-4">
            {quickActions.map((action, index) => (
              <Button key={index} variant="outline" className="flex items-center" onClick={action.action}>
                {action.icon}
                <span className="ml-2">{action.text}</span>
              </Button>
            ))}
          </div>
          <div className="flex items-center mt-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your medical question..."
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-grow"
              disabled={isLoading}
            />
            <Button onClick={() => handleSend()} className="ml-2" disabled={isLoading}>
              <Send size={18} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


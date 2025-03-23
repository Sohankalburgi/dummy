"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/components/language-provider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatbotPage() {
  const { t } = useLanguage();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
  
    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);
  
    try {
      const response = await fetch("http://localhost:4000/chatbot/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }), // Send user input as 'prompt'
      });
  
      const data = await response.json();
      
      // The response format is { message: result }
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error fetching response. Try again!" }]);
    }
  
    setIsLoading(false);
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearImage = () => {
    setImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6 mt-10 mx-10 p-10">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-green-700 dark:text-green-300">{t("chatbot.title")}</h1>
        <p className="text-muted-foreground">Ask questions about agriculture and get AI-powered assistance</p>
      </div>

      <Card className="h-[calc(100vh-200px)]">
        <CardHeader className="p-4 border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <Bot className="h-5 w-5 text-green-600" />
            {t("chatbot.title")}
          </CardTitle>
          <CardDescription>Ask questions about crops, pests, farming techniques, and more</CardDescription>
        </CardHeader>
        <CardContent className="p-0 flex flex-col h-[calc(100%-140px)]">
          <ScrollArea className="flex-grow p-4">
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 mb-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-green-100 text-green-700">AI</AvatarFallback>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.role === "user" ? "bg-green-600 text-white" : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </AnimatePresence>
          </ScrollArea>

          {imageUrl && (
            <div className="p-4 border-t">
              <div className="relative inline-block">
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt="Uploaded"
                  className="h-20 w-auto rounded-md object-cover"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                  onClick={handleClearImage}
                >
                  ×
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-2 border-t">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            <Button type="button" variant="outline" size="icon" onClick={handleUploadClick} className="shrink-0">
              <Upload className="h-4 w-4" />
              <span className="sr-only">{t("chatbot.upload")}</span>
            </Button>
            <Input
              placeholder={t("chatbot.placeholder")}
              value={input}
              onChange={handleInputChange}
              className="flex-grow"
            />
            <Button
              type="submit"
              size="icon"
              className="shrink-0 bg-green-600 hover:bg-green-700 text-white"
              disabled={isLoading || (!input.trim() && !imageUrl)}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">{t("chatbot.send")}</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

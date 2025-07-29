import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import BottomNavigation from "./BottomNavigation";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI workout assistant. I can help you with workout plans, exercise tips, nutrition advice, and answer any fitness-related questions. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "That's a great question! Based on my knowledge, I'd recommend focusing on compound movements that work multiple muscle groups for maximum efficiency.",
      "I understand what you're looking for. For best results, consistency is key - aim for 3-4 workouts per week with proper rest between sessions.",
      "That's an excellent goal! Let me suggest a progressive approach that will help you build strength safely while avoiding injury.",
      "Great question! Nutrition plays a crucial role in fitness. I recommend focusing on whole foods and adequate protein intake to support your workouts.",
      "I love your enthusiasm! Remember that proper form is more important than lifting heavy weights. Quality over quantity always wins.",
      "That's a common concern among fitness enthusiasts. The key is listening to your body and gradually increasing intensity over time.",
      "Excellent point! Recovery is just as important as the workout itself. Make sure you're getting enough sleep and managing stress levels.",
      "I'm here to help you succeed! Based on your question, I'd suggest starting with bodyweight exercises to build a solid foundation.",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!currentInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: currentInput.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentInput("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(currentInput),
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-20">
      {/* Header Section */}
      <div className="px-6 pt-12 pb-4 border-b border-purple-100 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              AI Workout Assistant
            </h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Online and ready to help</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-2xl">
            <Bot className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 px-4 py-4">
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "ai" && (
                  <Avatar className="h-8 w-8 bg-gradient-to-br from-purple-500 to-pink-500">
                    <AvatarFallback className="text-white text-xs">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`max-w-[75%] ${
                    message.sender === "user" ? "order-1" : "order-2"
                  }`}
                >
                  <Card
                    className={`${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
                        : "bg-white border-gray-200 shadow-sm"
                    }`}
                  >
                    <CardContent className="p-3">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p
                        className={`text-xs mt-2 ${
                          message.sender === "user"
                            ? "text-purple-100"
                            : "text-gray-500"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {message.sender === "user" && (
                  <Avatar className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-500">
                    <AvatarFallback className="text-white text-xs">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-3 justify-start">
                <Avatar className="h-8 w-8 bg-gradient-to-br from-purple-500 to-pink-500">
                  <AvatarFallback className="text-white text-xs">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <Card className="bg-white border-gray-200 shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-1">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                      </div>
                      <span className="text-xs text-gray-500 ml-2">AI is typing...</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-20 left-0 right-0 px-4 py-3 bg-white/90 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me about workouts, nutrition, or fitness..."
                className="pr-12 py-3 bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-full"
                aria-label="Type your message to the AI assistant"
                disabled={isTyping}
              />
              <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-400" />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!currentInput.trim() || isTyping}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-full h-12 w-12 flex items-center justify-center"
              aria-label="Send message"
              tabIndex={0}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activePage="Chat" />
    </div>
  );
};

export default ChatPage; 
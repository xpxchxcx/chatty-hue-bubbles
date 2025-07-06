import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "🏠 Welcome to Hatch! I'm your real estate concierge. I'm here to help you navigate your home buying journey. What can I assist you with today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const simulateTyping = async (response: string) => {
    setIsTyping(true);
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: response,
      isUser: false,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsTyping(false);
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! Welcome to Hatch. I'm excited to help you with your real estate journey. Are you looking to buy, sell, or just exploring your options?";
    }
    
    if (lowerMessage.includes("help")) {
      return "I'm here to help with all your real estate needs! Whether you're a first-time buyer, looking to sell, or interested in market insights, I can guide you through the process. What would you like to know?";
    }
    
    if (lowerMessage.includes("how are you")) {
      return "I'm doing wonderful, thank you for asking! I'm excited to help you find your perfect home. How can I assist you with your real estate needs today?";
    }
    
    if (lowerMessage.includes("name")) {
      return "I'm your Hatch Real Estate Concierge! I'm here to make your home buying or selling experience feel like magic. What should I call you?";
    }
    
    if (lowerMessage.includes("buy") || lowerMessage.includes("purchase") || lowerMessage.includes("home")) {
      return "That's exciting! Buying a home is a wonderful journey. I can help you understand the process, explore neighborhoods, and connect you with our expert agents. What type of home are you looking for?";
    }
    
    if (lowerMessage.includes("sell")) {
      return "Looking to sell your home? I can help you understand current market conditions and connect you with our top-performing agents to get you the best value. Tell me about your property!";
    }
    
    if (lowerMessage.includes("thank")) {
      return "You're very welcome! I'm always here to help make your real estate experience smooth and enjoyable. What else can I assist you with?";
    }
    
    // Default responses
    const defaultResponses = [
      "That's great! Tell me more about your real estate goals.",
      "I'd love to help you with that. Real estate can feel overwhelming, but I'm here to guide you through it.",
      "Thanks for sharing! How can I help make your home buying or selling journey easier?",
      "That sounds interesting! Would you like to explore how Hatch can help with that?",
      "I'm here to help! Can you tell me more about what you're looking for in your real estate journey?",
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = (messageText: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Generate and send bot response
    const botResponse = getBotResponse(messageText);
    simulateTyping(botResponse);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-subtle">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-4 shadow-elevation">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Hatch Real Estate Concierge</h1>
            <p className="text-sm opacity-90">Your personal guide to finding the perfect home</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate("/swipe")}
            className="bg-white/20 text-white border-white/30 hover:bg-white/30"
          >
            <Heart className="w-4 h-4 mr-2" />
            Browse Properties
          </Button>
        </div>
      </div>
      
      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-2">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-card text-card-foreground rounded-2xl rounded-bl-sm px-4 py-3 shadow-soft border">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};

export default ChatBot;
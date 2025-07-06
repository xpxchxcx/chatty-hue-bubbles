import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi there! I'm your AI assistant. How can I help you today?",
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
      return "Hello! It's great to meet you. What would you like to chat about?";
    }
    
    if (lowerMessage.includes("help")) {
      return "I'm here to help! You can ask me questions about anything you'd like to discuss. What's on your mind?";
    }
    
    if (lowerMessage.includes("how are you")) {
      return "I'm doing wonderful, thank you for asking! I'm excited to chat with you. How are you doing today?";
    }
    
    if (lowerMessage.includes("name")) {
      return "I'm your friendly AI assistant! You can call me whatever you'd like. What should I call you?";
    }
    
    if (lowerMessage.includes("weather")) {
      return "I don't have real-time weather data, but I'd be happy to chat about weather in general or help you with something else!";
    }
    
    if (lowerMessage.includes("thank")) {
      return "You're very welcome! I'm always happy to help. Is there anything else you'd like to discuss?";
    }
    
    // Default responses
    const defaultResponses = [
      "That's interesting! Tell me more about that.",
      "I appreciate you sharing that with me. What else would you like to talk about?",
      "Thanks for letting me know! How can I assist you further?",
      "That sounds intriguing. Would you like to explore that topic more?",
      "I'd love to help you with that. Can you provide a bit more detail?",
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl font-semibold">AI Assistant</h1>
          <p className="text-sm opacity-90">Your friendly conversational companion</p>
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
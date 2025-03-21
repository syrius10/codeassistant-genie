
import React, { useRef, useEffect } from 'react';
import { Bot, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from './ChatWindow';

type SubscriptionTier = 'free' | 'pro' | 'enterprise';

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
  userTier: SubscriptionTier;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ 
  messages, 
  isLoading, 
  userTier 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto h-[calc(100%-120px)]">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div className="glass-card p-3 rounded-lg rounded-tl-none text-sm">
            <p className="text-slate-600">
              {userTier === 'enterprise' 
                ? "Welcome to your priority AI assistant! I'm here to provide expert help with your development workflow. How can I assist you today?"
                : "Hi there! I'm your AI assistant. How can I help you with CodePilot.AI today?"}
            </p>
          </div>
        </div>
        
        {messages.map((message) => (
          <div 
            key={message.id}
            className={cn(
              "flex items-start gap-3",
              message.role === 'user' && "justify-end"
            )}
          >
            {message.role === 'assistant' && (
              <div className="p-2 bg-primary/10 rounded-full">
                <Bot className="h-4 w-4 text-primary" />
              </div>
            )}
            
            <div className={cn(
              "p-3 rounded-lg text-sm max-w-[80%]",
              message.role === 'user' 
                ? "bg-primary text-primary-foreground font-normal rounded-tr-none"
                : "glass-card rounded-tl-none text-slate-600 font-normal"
            )}>
              <p>{message.content}</p>
            </div>
            
            {message.role === 'user' && (
              <div className="p-2 bg-primary rounded-full">
                <Cpu className="h-4 w-4 text-primary-foreground" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div className="glass-card p-3 rounded-lg rounded-tl-none">
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce"></div>
                <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce animation-delay-200"></div>
                <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce animation-delay-400"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

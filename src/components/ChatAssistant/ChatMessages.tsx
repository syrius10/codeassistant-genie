
import React, { useRef, useEffect } from 'react';
import { Bot, Cpu, Sparkles } from 'lucide-react';
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
        <div className="flex items-start gap-3 animate-fade-in">
          <div className="p-2 bg-primary/20 rounded-full shadow-glow-primary">
            {userTier === 'enterprise' ? (
              <Sparkles className="h-4 w-4 text-primary animate-pulse-slow" />
            ) : (
              <Bot className="h-4 w-4 text-primary" />
            )}
          </div>
          <div className="glass-card p-3 rounded-lg rounded-tl-none text-sm transition-all duration-300 hover:shadow-glow-primary">
            <p className="text-foreground/90">
              {userTier === 'enterprise' 
                ? "Welcome to your priority AI assistant! I'm here to provide expert help with your development workflow. How can I assist you today?"
                : "Hi there! I'm your AI assistant. How can I help you with CodePilot.AI today?"}
            </p>
          </div>
        </div>
        
        {messages.map((message, index) => (
          <div 
            key={message.id}
            className={cn(
              "flex items-start gap-3 animate-fade-in",
              message.role === 'user' && "justify-end",
              `animation-delay-${(index % 5) * 100}`
            )}
          >
            {message.role === 'assistant' && (
              <div className={cn(
                "p-2 rounded-full transition-all duration-300",
                userTier === 'enterprise' 
                  ? "bg-accent/20 shadow-glow-accent" 
                  : "bg-primary/20 shadow-glow-primary"
              )}>
                {userTier === 'enterprise' ? (
                  <Sparkles className="h-4 w-4 text-accent animate-pulse-slow" />
                ) : (
                  <Bot className="h-4 w-4 text-primary" />
                )}
              </div>
            )}
            
            <div className={cn(
              "p-3 rounded-lg text-sm max-w-[80%] transition-all duration-300",
              message.role === 'user' 
                ? "bg-primary text-primary-foreground font-normal rounded-tr-none shadow-glow-primary"
                : cn(
                    "glass-card rounded-tl-none text-foreground/90 font-normal",
                    userTier === 'enterprise' ? "hover:shadow-glow-accent" : "hover:shadow-glow-primary"
                  )
            )}>
              <p>{message.content}</p>
            </div>
            
            {message.role === 'user' && (
              <div className="p-2 bg-primary rounded-full shadow-glow-primary">
                <Cpu className="h-4 w-4 text-primary-foreground animate-pulse-slow" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-3 animate-fade-in">
            <div className={cn(
              "p-2 rounded-full",
              userTier === 'enterprise' 
                ? "bg-accent/20 shadow-glow-accent" 
                : "bg-primary/20 shadow-glow-primary"
            )}>
              {userTier === 'enterprise' ? (
                <Sparkles className="h-4 w-4 text-accent" />
              ) : (
                <Bot className="h-4 w-4 text-primary" />
              )}
            </div>
            <div className={cn(
              "glass-card p-3 rounded-lg rounded-tl-none",
              userTier === 'enterprise' ? "shadow-glow-accent" : "shadow-glow-primary"
            )}>
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce"></div>
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce animation-delay-200"></div>
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce animation-delay-400"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

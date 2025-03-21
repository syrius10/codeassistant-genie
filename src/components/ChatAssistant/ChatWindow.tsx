
import React, { useState } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { FreeTierPrompt } from './FreeTierPrompt';
import { cn } from '@/lib/utils';

type SubscriptionTier = 'free' | 'pro' | 'enterprise';

interface ChatWindowProps {
  userTier: SubscriptionTier;
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ userTier, onClose }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate AI response timing based on tier
    setTimeout(() => {
      const responseDelay = userTier === 'enterprise' ? 800 : 2000;
      
      setTimeout(() => {
        // Add assistant message
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: getAIResponse(content, userTier),
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, responseDelay);
    }, 500);
  };

  return (
    <div
      className={cn(
        "fixed right-6 bottom-6 w-[380px] glass-card shadow-subtle-lg z-50 transition-all duration-300 ease-ios overflow-hidden",
        isMinimized ? "h-14" : "h-[500px] max-h-[80vh]"
      )}
    >
      <ChatHeader 
        userTier={userTier} 
        isMinimized={isMinimized} 
        onToggleMinimize={handleToggleMinimize} 
        onClose={onClose} 
      />
      
      {!isMinimized && (
        <>
          {userTier === 'free' ? (
            <FreeTierPrompt />
          ) : (
            <>
              <ChatMessages 
                messages={messages} 
                isLoading={isLoading} 
                userTier={userTier} 
              />
              
              <ChatInput 
                onSendMessage={handleSendMessage} 
                isLoading={isLoading} 
                userTier={userTier} 
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

// Helper function for AI responses
const getAIResponse = (input: string, tier: SubscriptionTier): string => {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
    return tier === 'enterprise' 
      ? "Hello! I'm your priority AI assistant. How can I help you with your development workflow today?"
      : "Hello! I'm your AI assistant. How can I help you with CodePilot.AI today?";
  }
  
  if (lowerInput.includes('plan') || lowerInput.includes('subscription') || lowerInput.includes('upgrade')) {
    return "You can view our subscription plans on the Pricing page. We offer Free, Pro, and Enterprise tiers with different feature sets. Would you like me to explain the differences?";
  }
  
  if (lowerInput.includes('test') || lowerInput.includes('testing')) {
    return tier === 'enterprise'
      ? "Our Enterprise plan offers comprehensive testing capabilities including unit, integration, and end-to-end testing. You can use 'Advanced Test Generation' from your dashboard to automatically create tests for your codebase."
      : "On the Pro plan, you have access to automated test generation for unit and integration tests. Navigate to the 'Generate Tests' section of your dashboard to get started.";
  }
  
  if (lowerInput.includes('refactor') || lowerInput.includes('optimize')) {
    return tier === 'enterprise'
      ? "Enterprise users have access to our advanced AI refactoring tools. You can optimize your entire codebase with one click, or select specific files or functions to refactor. Would you like a step-by-step guide?"
      : "Pro users can use our AI refactoring tools to improve code quality. Navigate to your repository in the dashboard and click 'Optimize Code' to get started.";
  }
  
  return tier === 'enterprise'
    ? "I'm here to provide priority assistance with your development workflow. Could you provide more details about what you need help with? I can assist with code optimization, test generation, CI/CD workflows, or any other CodePilot.AI features."
    : "Thanks for your question. I can help you with using CodePilot.AI features like code suggestions, test generation, and more. Could you provide more specific details about what you need assistance with?";
};

// Define the ChatMessage type
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

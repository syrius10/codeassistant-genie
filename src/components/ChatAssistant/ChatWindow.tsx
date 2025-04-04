
import React, { useState, useEffect } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { FreeTierPrompt } from './FreeTierPrompt';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

type SubscriptionTier = 'free' | 'pro' | 'enterprise';

interface ChatWindowProps {
  userTier: SubscriptionTier;
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ userTier, onClose }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleToggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: content, userTier }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Add assistant message
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Show success toast
      toast({
        title: 'Message sent',
        description: 'Your message was delivered successfully',
        variant: 'default',
      });
    } catch (error: any) {
      console.error('Error calling AI chat function:', error);
      toast({
        title: 'Error',
        description: 'Failed to get AI response. Please try again.',
        variant: 'destructive',
      });
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Adjust size and position for mobile devices
  const windowClasses = cn(
    "fixed z-50 transition-all duration-300 ease-ios overflow-hidden glass-card shadow-subtle-lg",
    isMinimized ? "h-14" : "h-[500px] max-h-[80vh]",
    isMobile
      ? "bottom-0 right-0 left-0 w-full rounded-t-xl rounded-b-none shadow-subtle-lg"
      : "right-6 bottom-6 w-[380px] rounded-xl"
  );

  return (
    <div className={windowClasses}>
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

// Define the ChatMessage type
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

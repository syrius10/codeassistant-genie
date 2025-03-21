
import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ChatButton } from './ChatButton';
import { ChatWindow } from './ChatWindow';

type SubscriptionTier = 'free' | 'pro' | 'enterprise';

interface ChatAssistantProps {
  userTier?: SubscriptionTier;
}

const ChatAssistant = ({ userTier = 'free' }: ChatAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleOpen = () => {
    if (userTier === 'free') {
      toast({
        title: "AI Chat Assistant",
        description: "Upgrade to Pro or Enterprise to access the AI Chat Assistant feature.",
        variant: "destructive",
      });
      return;
    }
    
    setIsOpen(true);
  };

  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <ChatButton userTier={userTier} onClick={handleOpen} />
      )}
      
      {/* Chat window */}
      {isOpen && (
        <ChatWindow userTier={userTier} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default ChatAssistant;


import React from 'react';
import { Bot, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

type SubscriptionTier = 'free' | 'pro' | 'enterprise';

interface ChatButtonProps {
  userTier: SubscriptionTier;
  onClick: () => void;
}

export const ChatButton: React.FC<ChatButtonProps> = ({ userTier, onClick }) => {
  return (
    <button
      className={cn(
        "fixed bottom-6 right-6 p-4 rounded-full shadow-subtle-lg z-50 transition-all duration-300",
        userTier === 'free' ? "bg-secondary" : "bg-primary"
      )}
      onClick={onClick}
    >
      {userTier === 'enterprise' ? (
        <Crown className="h-6 w-6 text-primary-foreground" />
      ) : (
        <Bot className="h-6 w-6 text-primary-foreground" />
      )}
    </button>
  );
};

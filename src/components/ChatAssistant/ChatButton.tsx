
import React from 'react';
import { Bot, Crown, Sparkles } from 'lucide-react';
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
        "fixed bottom-6 right-6 p-4 rounded-full z-50 transition-all duration-500 transform hover:scale-110",
        userTier === 'free' 
          ? "bg-secondary hover:bg-secondary/90" 
          : userTier === 'pro'
            ? "bg-primary hover:bg-primary/90 shadow-glow-primary"
            : "bg-accent hover:bg-accent/90 shadow-glow-accent"
      )}
      onClick={onClick}
    >
      <div className="relative">
        {userTier === 'enterprise' ? (
          <Crown className="h-6 w-6 text-accent-foreground animate-pulse-slow" />
        ) : userTier === 'pro' ? (
          <Bot className="h-6 w-6 text-primary-foreground animate-pulse-slow" />
        ) : (
          <Bot className="h-6 w-6 text-secondary-foreground" />
        )}
        
        {userTier !== 'free' && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className={cn(
              "relative inline-flex rounded-full h-3 w-3", 
              userTier === 'enterprise' ? "bg-accent" : "bg-primary"
            )}></span>
          </span>
        )}
      </div>
    </button>
  );
};

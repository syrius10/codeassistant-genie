
import React from 'react';
import { Bot, Crown, X, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type SubscriptionTier = 'free' | 'pro' | 'enterprise';

interface ChatHeaderProps {
  userTier: SubscriptionTier;
  isMinimized: boolean;
  onToggleMinimize: () => void;
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  userTier,
  isMinimized,
  onToggleMinimize,
  onClose
}) => {
  return (
    <div className="bg-primary/10 backdrop-blur-sm border-b border-border p-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {userTier === 'enterprise' ? (
          <Crown className="h-5 w-5 text-primary" />
        ) : (
          <Bot className="h-5 w-5 text-primary" />
        )}
        <span className="font-medium">
          {userTier === 'enterprise' ? 'Priority Assistant' : 'AI Assistant'}
        </span>
        {userTier === 'enterprise' && (
          <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
            Priority
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={onToggleMinimize}
        >
          {isMinimized ? (
            <Maximize2 className="h-4 w-4" />
          ) : (
            <Minimize2 className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

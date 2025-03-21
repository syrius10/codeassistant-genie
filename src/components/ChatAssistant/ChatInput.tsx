
import React, { useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type SubscriptionTier = 'free' | 'pro' | 'enterprise';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  userTier: SubscriptionTier;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isLoading, 
  userTier 
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    onSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-border">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`${userTier === 'enterprise' ? 'Ask your priority assistant...' : 'Ask the AI assistant...'}`}
          className="flex-1 px-4 py-2 rounded-md bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <Button type="submit" size="icon" disabled={!inputValue.trim() || isLoading}>
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
      {userTier === 'pro' && (
        <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
          <span>Need priority support?</span>
          <Link to="/pricing" className="text-primary hover:underline">Upgrade to Enterprise</Link>
        </div>
      )}
    </form>
  );
};

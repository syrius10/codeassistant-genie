
import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type SubscriptionTier = 'free' | 'pro' | 'enterprise';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  userTier: SubscriptionTier;
  isError?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isLoading, 
  userTier,
  isError = false
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input when component mounts
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    onSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-border">
      {isError && (
        <div className="mb-2 px-2 py-1 bg-destructive/10 text-destructive text-xs rounded flex items-center">
          <AlertCircle className="h-3 w-3 mr-1" />
          There was an error connecting to the AI service. Your message will retry when you send it.
        </div>
      )}
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`${userTier === 'enterprise' ? 'Ask your priority assistant...' : 'Ask the AI assistant...'}`}
          className="flex-1 px-4 py-2 rounded-md bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Message input"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                type="submit" 
                size="icon" 
                disabled={!inputValue.trim() || isLoading}
                aria-label="Send message"
              >
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Send message</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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

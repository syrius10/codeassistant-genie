
import React from 'react';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const FreeTierPrompt: React.FC = () => {
  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
        <div className="p-4 bg-primary/10 rounded-full">
          <Bot className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-xl font-medium">Upgrade to Chat with AI</h3>
        <p className="text-secondary max-w-[280px]">
          AI chat support is available exclusively for Pro and Enterprise subscribers.
        </p>
        <Link to="/pricing" className="mt-4">
          <Button>View Pricing Plans</Button>
        </Link>
      </div>
    </div>
  );
};


import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Bot, Cpu, X, Crown, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

type SubscriptionTier = 'free' | 'pro' | 'enterprise';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatAssistantProps {
  userTier?: SubscriptionTier;
}

const ChatAssistant = ({ userTier = 'free' }: ChatAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    if (userTier === 'free') {
      setIsOpen(false);
      toast({
        title: "AI Chat Assistant",
        description: "Upgrade to Pro or Enterprise to access the AI Chat Assistant feature.",
        variant: "destructive",
      });
      return;
    }
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate AI response timing based on tier
    setTimeout(() => {
      const responseDelay = userTier === 'enterprise' ? 800 : 2000;
      
      setTimeout(() => {
        // Add assistant message
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: getAIResponse(inputValue, userTier),
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, responseDelay);
    }, 500);
  };

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

  return (
    <>
      {/* Chat button */}
      <button
        className={cn(
          "fixed bottom-6 right-6 p-4 rounded-full shadow-subtle-lg z-50 transition-all duration-300",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100",
          userTier === 'free' ? "bg-secondary" : userTier === 'enterprise' ? "bg-primary" : "bg-primary"
        )}
        onClick={() => setIsOpen(true)}
      >
        {userTier === 'enterprise' ? (
          <Crown className="h-6 w-6 text-primary-foreground" />
        ) : (
          <Bot className="h-6 w-6 text-primary-foreground" />
        )}
      </button>
      
      {/* Chat window */}
      <div
        className={cn(
          "fixed right-6 bottom-6 w-[380px] glass-card shadow-subtle-lg z-50 transition-all duration-300 ease-ios overflow-hidden",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
          isMinimized ? "h-14" : "h-[500px] max-h-[80vh]"
        )}
      >
        {/* Chat header */}
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
              onClick={() => setIsMinimized(!isMinimized)}
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
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {!isMinimized && (
          <>
            {/* Free tier upgrade prompt */}
            {userTier === 'free' ? (
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
            ) : (
              <>
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto h-[calc(100%-120px)]">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="glass-card p-3 rounded-lg rounded-tl-none text-sm">
                        <p>
                          {userTier === 'enterprise' 
                            ? "Welcome to your priority AI assistant! I'm here to provide expert help with your development workflow. How can I assist you today?"
                            : "Hi there! I'm your AI assistant. How can I help you with CodePilot.AI today?"}
                        </p>
                      </div>
                    </div>
                    
                    {messages.map((message) => (
                      <div 
                        key={message.id}
                        className={cn(
                          "flex items-start gap-3",
                          message.role === 'user' && "justify-end"
                        )}
                      >
                        {message.role === 'assistant' && (
                          <div className="p-2 bg-primary/10 rounded-full">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                        )}
                        
                        <div className={cn(
                          "p-3 rounded-lg text-sm max-w-[80%]",
                          message.role === 'user' 
                            ? "bg-primary text-primary-foreground rounded-tr-none"
                            : "glass-card rounded-tl-none"
                        )}>
                          <p>{message.content}</p>
                        </div>
                        
                        {message.role === 'user' && (
                          <div className="p-2 bg-primary rounded-full">
                            <Cpu className="h-4 w-4 text-primary-foreground" />
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                        <div className="glass-card p-3 rounded-lg rounded-tl-none">
                          <div className="flex gap-1">
                            <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce"></div>
                            <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce animation-delay-200"></div>
                            <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce animation-delay-400"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </div>
                
                {/* Input */}
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
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ChatAssistant;

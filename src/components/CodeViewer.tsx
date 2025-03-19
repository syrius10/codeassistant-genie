
import { useState, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';

interface CodeViewerProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  initialFocus?: boolean;
}

const CodeViewer = ({ 
  code, 
  language = 'typescript', 
  title = 'Code Snippet', 
  showLineNumbers = true,
  initialFocus = false
}: CodeViewerProps) => {
  const [copied, setCopied] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [maxLineNumberWidth, setMaxLineNumberWidth] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const lines = code.split('\n');
    setLineCount(lines.length);
    setMaxLineNumberWidth(String(lines.length).length * 10 + 10); // estimate of character width
  }, [code]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      ref={ref}
      className={cn(
        "glass-card transition-all duration-700 ease-ios overflow-hidden",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
        <span className="text-sm font-medium">{title}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 gap-1.5 px-2 text-xs"
          onClick={copyToClipboard}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>
      
      <div className="p-4 overflow-x-auto">
        <pre className={cn(
          "text-sm font-mono",
          initialFocus && "animate-blur-in"
        )}>
          {showLineNumbers ? (
            <div className="flex">
              <div 
                className="text-right select-none pr-4 border-r border-border mr-4 text-muted-foreground" 
                style={{ minWidth: maxLineNumberWidth + 'px' }}
              >
                {Array.from({ length: lineCount }, (_, i) => (
                  <div key={i} className="leading-6">
                    {i + 1}
                  </div>
                ))}
              </div>
              <code className={`language-${language}`}>{code}</code>
            </div>
          ) : (
            <code className={`language-${language}`}>{code}</code>
          )}
        </pre>
      </div>
    </div>
  );
};

export default CodeViewer;

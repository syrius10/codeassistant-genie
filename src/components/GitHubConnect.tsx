
import { useState } from 'react';
import { Github, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import CodeViewer from './CodeViewer';

const GitHubConnect = () => {
  const [githubUrl, setGithubUrl] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const { toast } = useToast();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!githubUrl || !githubUrl.includes('github.com')) {
      toast({
        title: "Invalid GitHub URL",
        description: "Please enter a valid GitHub repository URL",
        variant: "destructive",
      });
      return;
    }
    
    setIsConnecting(true);
    
    // Simulate connection
    setTimeout(() => {
      setIsConnecting(false);
      setConnected(true);
      toast({
        title: "Repository Connected",
        description: "Successfully connected to GitHub repository",
      });
    }, 1500);
  };

  const sampleConfig = `// codepilot.config.js
module.exports = {
  repository: "${githubUrl || 'https://github.com/username/project'}",
  
  // AI agent configuration
  agent: {
    model: "gpt-4",
    memory: true,
    contextWindow: 16000
  },
  
  // Testing preferences
  testing: {
    minCoverage: 95,
    generateMissingTests: true,
    frameworks: {
      unit: "jest",
      integration: "cypress"
    }
  },
  
  // GitHub integration settings
  github: {
    autoCommit: true,
    createPullRequests: true,
    branchPrefix: "codepilot/"
  }
}`;

  return (
    <section id="github" className="py-24 px-6 lg:px-8 bg-accent/50">
      <div 
        ref={ref}
        className={cn(
          "max-w-7xl mx-auto transition-all duration-700 ease-ios",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-5">Connect Your GitHub Repository</h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Connect CodePilot.AI to your GitHub repository to start analyzing and optimizing your codebase.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="glass-card p-8">
            <div className="mb-8">
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-5">
                <Github className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Repository Connection</h3>
              <p className="text-secondary">
                Enter your GitHub repository URL to connect CodePilot.AI to your project.
              </p>
            </div>

            <form onSubmit={handleConnect} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="github-url">GitHub Repository URL</Label>
                <Input
                  id="github-url"
                  placeholder="https://github.com/username/repository"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${connected ? 'bg-green-500' : 'bg-muted'}`}>
                    {connected && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className={connected ? 'text-green-500' : 'text-muted-foreground'}>
                    {connected ? 'Repository Connected' : 'Connect Repository'}
                  </span>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12" 
                disabled={isConnecting || connected}
              >
                {isConnecting ? 'Connecting...' : connected ? 'Connected' : 'Connect Repository'}
                {!isConnecting && !connected && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>

            {connected && (
              <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-sm">
                <p className="font-medium text-green-600 mb-1">Successfully Connected</p>
                <p className="text-secondary">
                  Your repository has been successfully connected to CodePilot.AI. 
                  You can now start analyzing and optimizing your codebase.
                </p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-medium mb-6">Configuration</h3>
            <CodeViewer 
              code={sampleConfig} 
              title="codepilot.config.js" 
              language="javascript"
              initialFocus={true}
            />
            <p className="text-sm text-secondary mt-4">
              Customize your CodePilot.AI configuration to tailor the AI behavior
              to your project's specific needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubConnect;

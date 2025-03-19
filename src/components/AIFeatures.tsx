
import React from 'react';
import { 
  Code, GitMerge, Bot, Shield, 
  TestTube, Terminal, Zap, CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tier: 'free' | 'pro' | 'enterprise';
}

const FeatureCard = ({ icon, title, description, tier }: FeatureCardProps) => {
  return (
    <div className="glass-card p-6 rounded-lg border border-border transition-all hover:shadow-subtle-lg hover:translate-y-[-2px]">
      <div className={cn(
        "p-3 rounded-lg mb-4 w-fit",
        tier === 'free' ? 'bg-secondary/20' : 
        tier === 'pro' ? 'bg-primary/20' : 
        'bg-primary/30'
      )}>
        {icon}
      </div>
      
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-secondary text-sm">{description}</p>
      
      <div className="mt-4 flex items-center gap-2">
        <span className={cn(
          "text-xs px-2 py-1 rounded-full",
          tier === 'free' ? 'bg-secondary/20 text-secondary-foreground' : 
          tier === 'pro' ? 'bg-primary/20 text-primary' : 
          'bg-primary/30 text-primary'
        )}>
          {tier === 'free' ? 'Free' : 
           tier === 'pro' ? 'Pro' : 'Enterprise'}
        </span>
      </div>
    </div>
  );
};

const AIFeatures = () => {
  return (
    <section className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-5 text-gradient-primary">
            AI-Powered Development
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            CodePilot.AI transforms your development workflow with cutting-edge artificial intelligence
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Code className="h-6 w-6 text-primary" />}
            title="AI Code Generation"
            description="CodePilot.AI autonomously writes, refactors, and optimizes code based on your project context and requirements."
            tier="free"
          />
          
          <FeatureCard
            icon={<TestTube className="h-6 w-6 text-primary" />}
            title="Automated Testing"
            description="AI generates and maintains comprehensive test suites, ensuring your code remains robust and bug-free."
            tier="pro"
          />
          
          <FeatureCard
            icon={<Terminal className="h-6 w-6 text-primary" />}
            title="CI/CD Automation"
            description="Let AI configure and optimize your deployment pipelines for maximum efficiency and reliability."
            tier="pro"
          />
          
          <FeatureCard
            icon={<Shield className="h-6 w-6 text-primary" />}
            title="AI Security Scans"
            description="Advanced vulnerability detection and mitigation recommendations powered by contextual AI understanding."
            tier="enterprise"
          />
          
          <FeatureCard
            icon={<Bot className="h-6 w-6 text-primary" />}
            title="AI Chat Assistant"
            description="Get real-time coding help and troubleshooting from your personal AI development partner."
            tier="pro"
          />
          
          <FeatureCard
            icon={<GitMerge className="h-6 w-6 text-primary" />}
            title="Smart Code Reviews"
            description="AI-powered code reviews that catch issues, suggest improvements, and ensure code quality."
            tier="enterprise"
          />
        </div>
        
        <div className="glass-card p-8 max-w-3xl mx-auto mt-16">
          <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <span>Enterprise AI Capabilities</span>
          </h3>
          
          <p className="text-secondary mb-6">
            For organizations requiring the most advanced AI development capabilities, our Enterprise tier offers:
          </p>
          
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <span className="font-medium">Custom-trained AI models</span>
                <p className="text-sm text-secondary">AI specifically trained on your codebase and coding patterns</p>
              </div>
            </li>
            
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <span className="font-medium">Unlimited AI resources</span>
                <p className="text-sm text-secondary">No limits on repositories, commits, or AI assistance</p>
              </div>
            </li>
            
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <span className="font-medium">Advanced security compliance</span>
                <p className="text-sm text-secondary">SOC 2, GDPR, and HIPAA compliance for regulated industries</p>
              </div>
            </li>
            
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <span className="font-medium">Priority AI support</span>
                <p className="text-sm text-secondary">Dedicated AI assistance with faster response times</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;

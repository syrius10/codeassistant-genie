
import { Code, GitBranch, GitPullRequest, Cog, AirplayIcon, Container, Layers, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  delay?: string;
}

const FeatureCard = ({ icon, title, description, className, delay }: FeatureCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={cn(
        "glass-card p-8 transition-all duration-700 ease-ios",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        delay,
        className
      )}
    >
      <div className="p-3 bg-primary/10 rounded-lg w-fit mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <p className="text-secondary">{description}</p>
    </div>
  );
};

const Features = () => {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="features" className="py-24 px-6 lg:px-8" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={cn(
            "text-3xl md:text-4xl font-medium mb-5 transition-all duration-700 ease-ios",
            sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            Powerful AI-Driven Features
          </h2>
          <p className={cn(
            "text-lg text-secondary max-w-2xl mx-auto transition-all duration-700 ease-ios animation-delay-100",
            sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            CodePilot.AI integrates seamlessly with your development workflow, offering intelligent automation at every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Code className="h-6 w-6 text-primary" />}
            title="AI Code Analysis"
            description="Instantly analyze repository structure and codebase quality with advanced machine learning algorithms."
            delay="animation-delay-100"
          />
          
          <FeatureCard 
            icon={<Cog className="h-6 w-6 text-primary" />}
            title="Automated Refactoring"
            description="Intelligently refactor and optimize code using AST parsing and best practice recommendations."
            delay="animation-delay-200"
          />
          
          <FeatureCard 
            icon={<AirplayIcon className="h-6 w-6 text-primary" />}
            title="Test Generation"
            description="Automatically create unit, integration, and end-to-end tests with comprehensive coverage."
            delay="animation-delay-300"
          />
          
          <FeatureCard 
            icon={<GitBranch className="h-6 w-6 text-primary" />}
            title="Git Integration"
            description="Seamlessly interact with GitHub repositories, branches, and commits via the GitHub API."
            delay="animation-delay-400"
          />
          
          <FeatureCard 
            icon={<GitPullRequest className="h-6 w-6 text-primary" />}
            title="Automated PRs"
            description="Generate well-structured commit messages and pull requests with AI-powered explanations."
            delay="animation-delay-500"
          />
          
          <FeatureCard 
            icon={<Container className="h-6 w-6 text-primary" />}
            title="CI/CD Pipeline"
            description="Integrate with GitHub Actions and Docker for smooth deployment of tested versions."
            delay="animation-delay-500"
          />
        </div>

        <div className="mt-16 glass-card p-8 md:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className={cn(
              "transition-all duration-700 ease-ios",
              sectionInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}>
              <h3 className="text-2xl md:text-3xl font-medium mb-5">Advanced AI Architecture</h3>
              <p className="text-secondary mb-6">
                Built on a foundation of cutting-edge AI models and autonomous agent frameworks, CodePilot.AI learns from each interaction to continuously improve its capabilities.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Layers className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>Autonomous AI Agent using LangChain & AutoGen</span>
                </div>
                <div className="flex items-center gap-3">
                  <LineChart className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>Contextual memory for better understanding</span>
                </div>
                <div className="flex items-center gap-3">
                  <Code className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>GPT-4 powered code analysis & generation</span>
                </div>
              </div>
            </div>
            
            <div className={cn(
              "transition-all duration-700 ease-ios",
              sectionInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            )}>
              <div className="glass h-[300px] md:h-[350px] rounded-xl overflow-hidden relative shadow-subtle">
                <div className="absolute top-0 left-0 right-0 h-8 bg-muted/50 flex items-center px-4">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/70" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                    <div className="h-3 w-3 rounded-full bg-green-500/70" />
                  </div>
                </div>
                <div className="p-4 pt-10 overflow-hidden">
                  <pre className="text-xs md:text-sm">
                    <code className="language-typescript">
                      <span className="text-code-purple">class</span> <span className="text-code-blue">CodePilotAgent</span> {"{"}
                      <br />
                      <span className="pl-4 text-code-purple">private</span> <span className="text-code-blue">model</span>: <span className="text-code-cyan">GPT4Model</span>;
                      <br />
                      <span className="pl-4 text-code-purple">private</span> <span className="text-code-blue">memory</span>: <span className="text-code-cyan">ContextMemory</span>;
                      <br />
                      <span className="pl-4 text-code-purple">private</span> <span className="text-code-blue">github</span>: <span className="text-code-cyan">GitHubIntegration</span>;
                      <br /><br />
                      <span className="pl-4 text-code-purple">constructor</span>() {"{"}
                      <br />
                      <span className="pl-8 text-code-blue">this</span>.<span className="text-code-blue">model</span> = <span className="text-code-purple">new</span> <span className="text-code-blue">GPT4Model</span>();
                      <br />
                      <span className="pl-8 text-code-blue">this</span>.<span className="text-code-blue">memory</span> = <span className="text-code-purple">new</span> <span className="text-code-blue">ContextMemory</span>();
                      <br />
                      <span className="pl-8 text-code-blue">this</span>.<span className="text-code-blue">github</span> = <span className="text-code-purple">new</span> <span className="text-code-blue">GitHubIntegration</span>();
                      <br />
                      <span className="pl-4">{"}"}</span>
                      <br /><br />
                      <span className="pl-4 text-code-purple">async</span> <span className="text-code-blue">analyzeRepository</span>(<span className="text-code-blue">repoUrl</span>: <span className="text-code-cyan">string</span>): <span className="text-code-cyan">Promise</span>{"<"}RepoAnalysis{">"} {"{"}
                      <br />
                      <span className="pl-8 text-code-purple">const</span> <span className="text-code-blue">repo</span> = <span className="text-code-purple">await</span> <span className="text-code-blue">this</span>.<span className="text-code-blue">github</span>.<span className="text-code-blue">fetchRepository</span>(<span className="text-code-blue">repoUrl</span>);
                      <br />
                      <span className="pl-8 text-code-purple">const</span> <span className="text-code-blue">analysis</span> = <span className="text-code-purple">await</span> <span className="text-code-blue">this</span>.<span className="text-code-blue">model</span>.<span className="text-code-blue">analyze</span>(<span className="text-code-blue">repo</span>);
                      <br />
                      <span className="pl-8 text-code-blue">this</span>.<span className="text-code-blue">memory</span>.<span className="text-code-blue">storeAnalysis</span>(<span className="text-code-blue">analysis</span>);
                      <br />
                      <span className="pl-8 text-code-purple">return</span> <span className="text-code-blue">analysis</span>;
                      <br />
                      <span className="pl-4">{"}"}</span>
                      <br />
                      {"}"}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

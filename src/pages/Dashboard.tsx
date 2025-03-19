
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { 
  ArrowLeft, 
  Cpu, 
  Github, 
  GitBranch, 
  GitCommit, 
  PlusCircle, 
  CheckCircle2,
  AlertCircle,
  Code,
  CheckSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import CodeViewer from "@/components/CodeViewer";

const Dashboard = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [inView]);

  useEffect(() => {
    // Welcome toast
    toast({
      title: "Welcome to Dashboard",
      description: "This is a preview of the CodePilot.AI dashboard.",
    });
  }, [toast]);

  const sampleCode = `function optimizePerformance(code) {
  // AI-identified performance optimization
  const patterns = identifyBottlenecks(code);
  
  if (patterns.includes('inefficientLoop')) {
    code = replaceWithOptimizedLoop(code);
  }
  
  if (patterns.includes('unnecessaryRenders')) {
    code = applyMemoization(code);
  }
  
  return {
    optimizedCode: code,
    improvements: patterns.length,
    estimatedSpeedup: calculateSpeedup(patterns)
  };
}`;

  return (
    <div ref={ref} className="min-h-screen">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border z-40 py-4 px-6 sticky top-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <Cpu className="h-6 w-6 text-primary" />
              <span className="font-semibold text-xl">CodePilot.AI</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-sm font-medium text-primary border-b-2 border-primary pb-1">Dashboard</Link>
              <Link to="#" className="text-sm font-medium text-secondary hover:text-foreground transition-colors">Projects</Link>
              <Link to="#" className="text-sm font-medium text-secondary hover:text-foreground transition-colors">Analytics</Link>
              <Link to="#" className="text-sm font-medium text-secondary hover:text-foreground transition-colors">Settings</Link>
            </nav>
          </div>
          
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-3xl font-medium mb-2">Project Dashboard</h1>
            <p className="text-secondary">AI-powered insights and actions for your development workflow</p>
          </div>
          
          <Button size="sm" className="gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>New Project</span>
          </Button>
        </div>
        
        {/* Repository Overview */}
        <div className="glass-card p-6 mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Github className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-medium">user/repository</h2>
                <p className="text-sm text-secondary">Last analyzed 2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-secondary">
                <GitBranch className="h-4 w-4" />
                <span>main</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary">
                <GitCommit className="h-4 w-4" />
                <span>23 commits</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Code className="h-4 w-4 text-primary" />
                  Code Quality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold mb-1">87/100</div>
                <p className="text-xs text-secondary">3 improvement opportunities</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-primary" />
                  Test Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold mb-1">78%</div>
                <p className="text-xs text-secondary">12 new tests recommended</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold mb-1">A+</div>
                <p className="text-xs text-secondary">No critical vulnerabilities</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* AI Recommendations */}
        <h2 className="text-2xl font-medium mb-6">AI Recommendations</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="glass-card p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Performance Optimization
            </h3>
            
            <p className="text-secondary mb-6">
              CodePilot.AI has identified 5 performance optimization opportunities in your codebase.
            </p>
            
            {!isLoading ? (
              <CodeViewer 
                code={sampleCode} 
                title="optimization-example.js" 
                language="javascript"
              />
            ) : (
              <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-md">
                <div className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-primary animate-spin" />
                  <span>Analyzing codebase...</span>
                </div>
              </div>
            )}
            
            <div className="mt-6 flex justify-end">
              <Button>Apply Optimizations</Button>
            </div>
          </div>
          
          <div className="glass-card p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Test Coverage Improvement
            </h3>
            
            <p className="text-secondary mb-4">
              CodePilot.AI can generate 12 new tests to improve coverage for these components:
            </p>
            
            <ul className="mb-6 space-y-2">
              {!isLoading ? (
                <>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>UserAuthentication.js - 4 tests</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>PaymentProcessor.js - 5 tests</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>DataTransformer.js - 3 tests</span>
                  </li>
                </>
              ) : (
                <div className="h-[100px] flex items-center justify-center bg-muted/30 rounded-md">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-primary animate-spin" />
                    <span>Analyzing test coverage...</span>
                  </div>
                </div>
              )}
            </ul>
            
            <div className="mt-6 flex justify-end">
              <Button>Generate Tests</Button>
            </div>
          </div>
        </div>
        
        {/* Dashboard Placeholder */}
        <div className="glass-card p-8 text-center">
          <h3 className="text-xl font-medium mb-4">Dashboard Preview</h3>
          <p className="text-secondary mb-6 max-w-md mx-auto">
            This is a preview of the CodePilot.AI dashboard. In a fully implemented version, you would see more detailed analytics and actionable insights.
          </p>
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Return to Home</span>
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

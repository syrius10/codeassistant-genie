
import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Cpu, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeViewer from "@/components/CodeViewer";
import { useSubscription } from "@/contexts/SubscriptionContext";

interface AIRecommendationsProps {
  isLoading: boolean;
}

const AIRecommendations = ({ isLoading }: AIRecommendationsProps) => {
  const { userTier } = useSubscription();
  
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
    <>
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
          
          {userTier === 'free' ? (
            <div className="glass-card p-6 bg-muted/20 text-center mb-6">
              <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <h4 className="text-lg font-medium mb-2">Pro Feature</h4>
              <p className="text-secondary text-sm mb-4">
                Automated test generation is available on Pro and Enterprise plans.
              </p>
              <Link to="/pricing">
                <Button variant="outline" size="sm">View Pricing</Button>
              </Link>
            </div>
          ) : (
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
          )}
          
          <div className="mt-6 flex justify-end">
            {userTier === 'free' ? (
              <Link to="/pricing">
                <Button variant="outline">Upgrade to Pro</Button>
              </Link>
            ) : (
              <Button>Generate Tests</Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AIRecommendations;

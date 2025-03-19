
import { useEffect, useState } from 'react';
import { Cpu, Check, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';

interface AnalysisItemProps {
  title: string;
  status: 'complete' | 'failed' | 'pending' | 'in-progress';
  message?: string;
  delay?: string;
}

const AnalysisItem = ({ title, status, message, delay }: AnalysisItemProps) => {
  return (
    <div className={`flex items-center gap-4 transition-all duration-500 delay-${delay}`}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300",
        status === 'complete' ? 'bg-green-500/20' : 
        status === 'failed' ? 'bg-red-500/20' : 
        status === 'in-progress' ? 'bg-primary/20 animate-pulse' : 
        'bg-muted'
      )}>
        {status === 'complete' && <Check className="h-4 w-4 text-green-500" />}
        {status === 'failed' && <X className="h-4 w-4 text-red-500" />}
        {status === 'in-progress' && <Cpu className="h-4 w-4 text-primary" />}
      </div>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        {message && <p className="text-sm text-secondary mt-1">{message}</p>}
      </div>
    </div>
  );
};

const AIAnalysis = () => {
  const [progress, setProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      // Animate progress bar
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 2;
        setProgress(Math.min(currentProgress, 100));
        if (currentProgress >= 100) clearInterval(progressInterval);
      }, 50);
      
      // Sequence the analysis steps
      const stepIntervals = [1000, 2000, 3200, 4500, 6000];
      
      stepIntervals.forEach((delay, index) => {
        setTimeout(() => {
          setAnalysisStep(index + 1);
        }, delay);
      });
      
      return () => {
        clearInterval(progressInterval);
      };
    }
  }, [inView]);

  return (
    <section className="py-24 px-6 lg:px-8 bg-gradient-to-b from-background to-accent/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-5 text-gradient-primary">AI-Powered Analysis</h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Watch as CodePilot.AI intelligently analyzes your codebase, identifying optimization opportunities and automatically generating tests.
          </p>
        </div>

        <div 
          ref={ref}
          className={cn(
            "glass-card p-8 max-w-3xl mx-auto transition-all duration-700 ease-ios shadow-subtle",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Analysis Progress</h3>
              <span className="text-sm text-secondary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 transition-all duration-300" />
          </div>

          <div className="space-y-6">
            <AnalysisItem 
              title="Repository Structure Analysis" 
              status={analysisStep >= 1 ? 'complete' : 'in-progress'}
              message={analysisStep >= 1 ? "Identified 48 files in 12 directories" : "Scanning repository structure..."}
            />
            
            <AnalysisItem 
              title="Code Quality Assessment" 
              status={analysisStep >= 2 ? 'complete' : analysisStep === 1 ? 'in-progress' : 'pending'}
              message={analysisStep >= 2 ? "Quality score: 87/100 - 3 potential improvements detected" : "Evaluating code quality..."}
            />
            
            <AnalysisItem 
              title="Test Coverage Analysis" 
              status={analysisStep >= 3 ? 'complete' : analysisStep === 2 ? 'in-progress' : 'pending'}
              message={analysisStep >= 3 ? "Current coverage: 78% - 12 new tests recommended" : "Checking test coverage..."}
            />
            
            <AnalysisItem 
              title="Performance Optimization" 
              status={analysisStep >= 4 ? 'complete' : analysisStep === 3 ? 'in-progress' : 'pending'}
              message={analysisStep >= 4 ? "5 optimization opportunities identified" : "Analyzing performance bottlenecks..."}
            />
            
            <AnalysisItem 
              title="Security Vulnerability Scan" 
              status={analysisStep >= 5 ? 'complete' : analysisStep === 4 ? 'in-progress' : 'pending'}
              message={analysisStep >= 5 ? "No critical vulnerabilities found - 2 minor issues detected" : "Scanning for security vulnerabilities..."}
            />
          </div>

          {analysisStep >= 5 && (
            <div className="mt-8 p-4 bg-primary/10 border border-primary/20 rounded-lg animate-fade-in">
              <p className="font-medium text-primary mb-1">Analysis Complete</p>
              <p className="text-sm text-secondary">
                CodePilot.AI has completed the analysis of your repository. View the detailed report to explore optimization opportunities and automated test suggestions.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIAnalysis;

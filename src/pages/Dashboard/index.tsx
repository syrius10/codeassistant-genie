
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { ArrowLeft, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSubscription } from "@/contexts/SubscriptionContext";
import Header from "./components/Header";
import RepositoryOverview from "./components/RepositoryOverview";
import AIRecommendations from "./components/AIRecommendations";
import DashboardPlaceholder from "./components/DashboardPlaceholder";

const Dashboard = () => {
  const { toast } = useToast();
  const { userTier, updateUsageStats } = useSubscription();
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
    
    // Simulate some usage stats for demo
    updateUsageStats({
      reposUsed: userTier === 'free' ? 1 : 3,
      commitsUsed: userTier === 'free' ? 4 : userTier === 'pro' ? 38 : 127
    });
  }, [toast, updateUsageStats, userTier]);

  return (
    <div ref={ref} className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-3xl font-medium mb-2">Project Dashboard</h1>
            <p className="text-secondary">AI-powered insights and actions for your development workflow</p>
          </div>
          
          <Button size="sm" className="gap-2">
            <Cpu className="h-4 w-4" />
            <span>New Project</span>
          </Button>
        </div>
        
        <RepositoryOverview isLoading={isLoading} />
        
        <AIRecommendations isLoading={isLoading} />
        
        <DashboardPlaceholder />
      </main>
    </div>
  );
};

export default Dashboard;

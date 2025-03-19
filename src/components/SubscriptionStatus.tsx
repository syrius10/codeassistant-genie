
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { formatPercentage } from '@/lib/utils';
import { 
  AlertCircle, Crown, ArrowRight, 
  CheckCircle2, XCircle, Code, 
  GitBranch, TestTube, Workflow,
  Shield, MessageSquare, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureItem = ({ name, available }: { name: string, available: boolean }) => (
  <div className="flex items-center gap-2 text-sm py-1">
    {available ? (
      <CheckCircle2 className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-muted-foreground" />
    )}
    <span className={!available ? "text-muted-foreground" : ""}>{name}</span>
  </div>
);

const SubscriptionStatus = () => {
  const { userTier, usageStats, tierFeatures } = useSubscription();
  
  const repoUsagePercentage = 
    usageStats.reposLimit === Infinity ? 
    (usageStats.reposUsed > 0 ? 25 : 0) : 
    (usageStats.reposUsed / usageStats.reposLimit) * 100;
    
  const commitUsagePercentage = 
    usageStats.commitsLimit === Infinity ? 
    (usageStats.commitsUsed > 0 ? 25 : 0) : 
    (usageStats.commitsUsed / usageStats.commitsLimit) * 100;
    
  const aiCreditsPercentage = 
    usageStats.aiCreditsLimit === Infinity ? 
    (usageStats.aiCreditsUsed > 0 ? 25 : 0) : 
    (usageStats.aiCreditsUsed / usageStats.aiCreditsLimit) * 100;
  
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Subscription Status</h3>
        <div className="flex items-center gap-2">
          <span className={`text-sm px-3 py-1 rounded-full ${
            userTier === 'free' ? 'bg-secondary text-secondary-foreground' :
            userTier === 'pro' ? 'bg-primary text-primary-foreground' :
            'bg-primary text-primary-foreground'
          }`}>
            {userTier === 'free' ? 'Free' : 
             userTier === 'pro' ? 'Pro' : 'Enterprise'}
          </span>
          
          {userTier !== 'enterprise' && (
            <Link to="/pricing">
              <Button variant="ghost" size="sm" className="h-8">
                Upgrade
              </Button>
            </Link>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        {userTier === 'free' && (
          <Alert className="bg-primary/10 border-primary/20">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertDescription>
              You're on the Free tier with limited features. Upgrade to Pro to unlock AI capabilities.
            </AlertDescription>
          </Alert>
        )}
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Repositories</span>
            <span className="text-sm">
              {usageStats.reposUsed}/{usageStats.reposLimit === Infinity ? 'Unlimited' : usageStats.reposLimit}
            </span>
          </div>
          <Progress value={repoUsagePercentage} className="h-2" />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">AI-Assisted Commits</span>
            <span className="text-sm">
              {usageStats.commitsUsed}/{usageStats.commitsLimit === Infinity ? 'Unlimited' : usageStats.commitsLimit}
            </span>
          </div>
          <Progress value={commitUsagePercentage} className="h-2" />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">AI Credits</span>
            <span className="text-sm">
              {usageStats.aiCreditsUsed}/{usageStats.aiCreditsLimit === Infinity ? 'Unlimited' : usageStats.aiCreditsLimit}
            </span>
          </div>
          <Progress value={aiCreditsPercentage} className="h-2" />
        </div>
        
        <div className="border-t border-border pt-4">
          <h4 className="font-medium mb-2">Available Features</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <FeatureItem name="AI Code Generation" available={tierFeatures.hasCodeGeneration} />
            <FeatureItem name="AI Code Refactoring" available={tierFeatures.hasRefactoring} />
            <FeatureItem name="Test Generation" available={tierFeatures.hasTestGeneration} />
            <FeatureItem name="CI/CD Automation" available={tierFeatures.hasCICD} />
            <FeatureItem name="Advanced Security" available={tierFeatures.hasAdvancedSecurity} />
            <FeatureItem name="AI Chat Assistant" available={tierFeatures.hasChatAssistant} />
            <FeatureItem name="Priority Support" available={tierFeatures.hasPrioritySupport} />
          </div>
        </div>
        
        {userTier === 'free' && commitUsagePercentage > 80 && (
          <Alert variant="destructive" className="bg-destructive/10 border-destructive/20">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You're approaching your monthly commit limit. Upgrade to Pro for more commits.
            </AlertDescription>
          </Alert>
        )}
        
        {userTier === 'pro' && commitUsagePercentage > 80 && (
          <Alert className="bg-primary/10 border-primary/20">
            <Crown className="h-4 w-4 text-primary" />
            <AlertDescription>
              You're approaching your Pro plan commit limit. Consider upgrading to Enterprise for unlimited commits.
            </AlertDescription>
          </Alert>
        )}
        
        {userTier === 'free' && (
          <div className="pt-2">
            <Link to="/pricing">
              <Button className="w-full gap-2">
                <span>Upgrade to Pro</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
        
        {userTier === 'pro' && (
          <div className="pt-2">
            <Link to="/pricing">
              <Button variant="outline" className="w-full gap-2">
                <span>View Enterprise Features</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionStatus;

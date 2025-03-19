
import React, { createContext, useContext, useState, useEffect } from 'react';

export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

// Enhanced feature set for the different tiers
interface TierFeatures {
  maxRepos: number | 'unlimited';
  maxCommits: number | 'unlimited';
  hasCodeGeneration: boolean;
  hasRefactoring: boolean;
  hasTestGeneration: boolean;
  hasCICD: boolean;
  hasAdvancedSecurity: boolean;
  hasChatAssistant: boolean;
  hasPrioritySupport: boolean;
  testTypes: string[];
}

interface SubscriptionContextType {
  userTier: SubscriptionTier;
  setUserTier: (tier: SubscriptionTier) => void;
  usageStats: {
    reposUsed: number;
    reposLimit: number;
    commitsUsed: number;
    commitsLimit: number;
    aiCreditsUsed: number;
    aiCreditsLimit: number;
  };
  updateUsageStats: (stats: Partial<{
    reposUsed: number;
    reposLimit: number;
    commitsUsed: number;
    commitsLimit: number;
    aiCreditsUsed: number;
    aiCreditsLimit: number;
  }>) => void;
  tierFeatures: TierFeatures;
  canUseFeature: (feature: keyof TierFeatures) => boolean;
}

const getTierFeatures = (tier: SubscriptionTier): TierFeatures => {
  switch (tier) {
    case 'free':
      return {
        maxRepos: 1,
        maxCommits: 5,
        hasCodeGeneration: true,
        hasRefactoring: false,
        hasTestGeneration: false,
        hasCICD: false,
        hasAdvancedSecurity: false,
        hasChatAssistant: false,
        hasPrioritySupport: false,
        testTypes: [],
      };
    case 'pro':
      return {
        maxRepos: 'unlimited',
        maxCommits: 50,
        hasCodeGeneration: true,
        hasRefactoring: true,
        hasTestGeneration: true,
        hasCICD: true,
        hasAdvancedSecurity: false,
        hasChatAssistant: true,
        hasPrioritySupport: false,
        testTypes: ['unit', 'integration'],
      };
    case 'enterprise':
      return {
        maxRepos: 'unlimited',
        maxCommits: 'unlimited',
        hasCodeGeneration: true,
        hasRefactoring: true,
        hasTestGeneration: true,
        hasCICD: true,
        hasAdvancedSecurity: true,
        hasChatAssistant: true,
        hasPrioritySupport: true,
        testTypes: ['unit', 'integration', 'e2e'],
      };
  }
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userTier, setUserTier] = useState<SubscriptionTier>('free');
  const [usageStats, setUsageStats] = useState({
    reposUsed: 0,
    reposLimit: 1,
    commitsUsed: 0,
    commitsLimit: 5,
    aiCreditsUsed: 0,
    aiCreditsLimit: 100
  });
  
  const [tierFeatures, setTierFeatures] = useState<TierFeatures>(getTierFeatures('free'));

  useEffect(() => {
    // Update tier features when tier changes
    setTierFeatures(getTierFeatures(userTier));
    
    // Update limits based on subscription tier
    if (userTier === 'free') {
      setUsageStats(prev => ({
        ...prev,
        reposLimit: 1,
        commitsLimit: 5,
        aiCreditsLimit: 100
      }));
    } else if (userTier === 'pro') {
      setUsageStats(prev => ({
        ...prev,
        reposLimit: Infinity,
        commitsLimit: 50,
        aiCreditsLimit: 1000
      }));
    } else if (userTier === 'enterprise') {
      setUsageStats(prev => ({
        ...prev,
        reposLimit: Infinity,
        commitsLimit: Infinity,
        aiCreditsLimit: Infinity
      }));
    }
  }, [userTier]);

  const updateUsageStats = (stats: Partial<typeof usageStats>) => {
    setUsageStats(prev => ({ ...prev, ...stats }));
  };
  
  const canUseFeature = (feature: keyof TierFeatures): boolean => {
    return !!tierFeatures[feature];
  };

  return (
    <SubscriptionContext.Provider value={{ 
      userTier, 
      setUserTier, 
      usageStats, 
      updateUsageStats,
      tierFeatures,
      canUseFeature
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

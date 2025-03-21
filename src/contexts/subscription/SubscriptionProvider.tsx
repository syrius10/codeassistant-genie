
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SubscriptionTier, TierFeatures, SubscriptionContextType, UsageStats } from './types';
import { getTierFeatures, getUsageLimits } from './utils';

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userTier, setUserTier] = useState<SubscriptionTier>('free');
  const [usageStats, setUsageStats] = useState<UsageStats>({
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
    const limits = getUsageLimits(userTier);
    setUsageStats(prev => ({
      ...prev,
      ...limits
    }));
  }, [userTier]);

  const updateUsageStats = (stats: Partial<UsageStats>) => {
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

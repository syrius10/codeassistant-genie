
import React, { createContext, useContext, useState, useEffect } from 'react';

export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

interface SubscriptionContextType {
  userTier: SubscriptionTier;
  setUserTier: (tier: SubscriptionTier) => void;
  usageStats: {
    reposUsed: number;
    reposLimit: number;
    commitsUsed: number;
    commitsLimit: number;
  };
  updateUsageStats: (stats: Partial<{
    reposUsed: number;
    reposLimit: number;
    commitsUsed: number;
    commitsLimit: number;
  }>) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userTier, setUserTier] = useState<SubscriptionTier>('free');
  const [usageStats, setUsageStats] = useState({
    reposUsed: 0,
    reposLimit: 1,
    commitsUsed: 0,
    commitsLimit: 5
  });

  useEffect(() => {
    // Update limits based on subscription tier
    if (userTier === 'free') {
      setUsageStats(prev => ({
        ...prev,
        reposLimit: 1,
        commitsLimit: 5
      }));
    } else if (userTier === 'pro') {
      setUsageStats(prev => ({
        ...prev,
        reposLimit: Infinity,
        commitsLimit: 50
      }));
    } else if (userTier === 'enterprise') {
      setUsageStats(prev => ({
        ...prev,
        reposLimit: Infinity,
        commitsLimit: Infinity
      }));
    }
  }, [userTier]);

  const updateUsageStats = (stats: Partial<typeof usageStats>) => {
    setUsageStats(prev => ({ ...prev, ...stats }));
  };

  return (
    <SubscriptionContext.Provider value={{ 
      userTier, 
      setUserTier, 
      usageStats, 
      updateUsageStats 
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

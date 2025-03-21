
export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

// Enhanced feature set for the different tiers
export interface TierFeatures {
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

export interface UsageStats {
  reposUsed: number;
  reposLimit: number;
  commitsUsed: number;
  commitsLimit: number;
  aiCreditsUsed: number;
  aiCreditsLimit: number;
}

export interface SubscriptionContextType {
  userTier: SubscriptionTier;
  setUserTier: (tier: SubscriptionTier) => void;
  usageStats: UsageStats;
  updateUsageStats: (stats: Partial<UsageStats>) => void;
  tierFeatures: TierFeatures;
  canUseFeature: (feature: keyof TierFeatures) => boolean;
}

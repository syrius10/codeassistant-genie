
import { SubscriptionTier, TierFeatures } from './types';

export const getTierFeatures = (tier: SubscriptionTier): TierFeatures => {
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

export const getUsageLimits = (tier: SubscriptionTier) => {
  if (tier === 'free') {
    return {
      reposLimit: 1,
      commitsLimit: 5,
      aiCreditsLimit: 100
    };
  } else if (tier === 'pro') {
    return {
      reposLimit: Infinity,
      commitsLimit: 50,
      aiCreditsLimit: 1000
    };
  } else if (tier === 'enterprise') {
    return {
      reposLimit: Infinity,
      commitsLimit: Infinity,
      aiCreditsLimit: Infinity
    };
  }
  
  return {
    reposLimit: 1,
    commitsLimit: 5,
    aiCreditsLimit: 100
  };
};

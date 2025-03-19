
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Add additional utility functions below
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

export const formatScore = (score: number, max: number = 100): string => {
  return `${score}/${max}`;
};

export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export const isValidGithubUrl = (url: string): boolean => {
  if (!isValidUrl(url)) return false;
  return url.includes('github.com/');
};

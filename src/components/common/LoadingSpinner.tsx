
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export const LoadingSpinner = ({ size = 8, className = "" }: LoadingSpinnerProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className={`h-${size} w-${size} animate-spin text-primary ${className}`} />
    </div>
  );
};

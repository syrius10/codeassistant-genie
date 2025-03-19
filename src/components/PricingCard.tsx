
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period: string;
  yearlyPrice?: string;
  yearlyPeriod?: string;
  yearlyNote?: string;
  icon: React.ReactNode;
  features: PlanFeature[];
  cta: string;
  popular: boolean;
  ctaLink: string;
}

interface PricingCardProps {
  plan: PricingPlan;
}

const PricingCard = ({ plan }: PricingCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card p-8 max-w-sm w-full transition-all duration-300 ease-ios",
        plan.popular ? "border-primary shadow-[0_8px_30px_-4px_rgba(0,0,0,0.2)]" : "shadow-subtle"
      )}
    >
      {plan.popular && (
        <div className="bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-full w-fit mx-auto -mt-12 mb-6">
          Most Popular
        </div>
      )}
      
      <div className="text-center mb-6">
        <div className={cn(
          "p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-4",
          plan.popular && "bg-primary/20"
        )}>
          {plan.icon}
        </div>
        <h3 className={cn(
          "text-xl font-medium mb-2",
          plan.popular && "text-primary"
        )}>
          {plan.name}
        </h3>
        <p className="text-secondary text-sm min-h-[40px]">{plan.description}</p>
      </div>
      
      <div className="text-center mb-6">
        <div className="flex items-end justify-center">
          <span className="text-3xl font-bold">{plan.price}</span>
          <span className="text-secondary ml-1">{plan.period}</span>
        </div>
        
        {plan.yearlyPrice && (
          <div className="mt-2 text-sm">
            <span className="text-secondary">or </span>
            <span className="font-medium">{plan.yearlyPrice}</span>
            <span className="text-secondary"> {plan.yearlyPeriod}</span>
            <span className="text-xs ml-1 text-green-600">{plan.yearlyNote}</span>
          </div>
        )}
      </div>
      
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            {feature.included ? (
              <Check className="h-4 w-4 text-green-500 mt-0.5" />
            ) : (
              <X className="h-4 w-4 text-destructive mt-0.5" />
            )}
            <span>{feature.name}</span>
          </li>
        ))}
      </ul>
      
      <div className="text-center">
        <Link to={plan.ctaLink}>
          <Button 
            className={cn(
              "w-full",
              !plan.popular && "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
            )}
          >
            {plan.cta}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PricingCard;

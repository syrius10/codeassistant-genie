
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Check, X, Cpu, ArrowRight, Crown, Building, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import PricingCard from "@/components/PricingCard";
import PricingFaq from "@/components/PricingFaq";

const Pricing = () => {
  const { toast } = useToast();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    toast({
      title: "Subscription Plans",
      description: "Choose the plan that fits your development needs.",
    });
  }, [toast]);

  const freePlan = {
    name: "Free",
    description: "Try out basic AI suggestions with limited access.",
    price: "$0",
    period: "forever",
    icon: <Cpu className="h-5 w-5" />,
    features: [
      { name: "1 repo per month", included: true },
      { name: "5 AI-assisted commits per month", included: true },
      { name: "Read-only AI code suggestions", included: true },
      { name: "Runs existing tests only", included: true },
      { name: "AI refactoring", included: false },
      { name: "CI/CD automation", included: false },
      { name: "AI chat support", included: false },
    ],
    cta: "Get Started",
    popular: false,
    ctaLink: "/dashboard"
  };

  const proPlan = {
    name: "Pro",
    description: "Full AI-powered tools for individual developers.",
    price: "$29",
    period: "per month",
    yearlyPrice: "$290",
    yearlyPeriod: "per year",
    yearlyNote: "(2 months free)",
    icon: <Crown className="h-5 w-5" />,
    features: [
      { name: "Unlimited repos", included: true },
      { name: "50 AI-assisted commits per month", included: true },
      { name: "AI-powered code refactoring", included: true },
      { name: "Automated test generation", included: true },
      { name: "Basic AI chat assistant", included: true },
      { name: "Basic CI/CD automation", included: true },
      { name: "Enterprise integrations", included: false },
    ],
    cta: "Upgrade to Pro",
    popular: true,
    ctaLink: "#subscribe-pro"
  };

  const enterprisePlan = {
    name: "Enterprise",
    description: "Advanced features for teams and organizations.",
    price: "$99",
    period: "per user/month",
    icon: <Building className="h-5 w-5" />,
    features: [
      { name: "Unlimited AI commits", included: true },
      { name: "Advanced AI refactoring & optimization", included: true },
      { name: "Full test generation (Unit, Integration, E2E)", included: true },
      { name: "Priority AI chat assistant", included: true },
      { name: "Enterprise integrations", included: true },
      { name: "Dedicated support", included: true },
      { name: "On-demand AI model customization", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
    ctaLink: "#contact-sales"
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div ref={headerRef} className="relative bg-background pt-28 pb-20 px-6 overflow-hidden">
        <div 
          className={cn(
            "max-w-7xl mx-auto text-center transition-all duration-700 ease-ios",
            headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h1 className="text-4xl md:text-5xl font-medium mb-6 text-gradient-primary">
            Choose Your Plan
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto mb-16">
            Unlock the power of AI-driven development with our flexible subscription plans.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 lg:gap-10">
            <PricingCard plan={freePlan} />
            <PricingCard plan={proPlan} />
            <PricingCard plan={enterprisePlan} />
          </div>
        </div>
      </div>
      
      {/* Features comparison */}
      <div className="py-24 px-6 bg-gradient-to-b from-background to-accent/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium mb-5 text-gradient-primary">
              Compare Plan Features
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Find the perfect plan for your development workflow.
            </p>
          </div>
          
          <div className="glass-card overflow-hidden shadow-subtle">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-4 text-left font-medium">Feature</th>
                    <th className="px-6 py-4 text-center font-medium w-[180px]">
                      <span className="flex flex-col items-center">
                        <Cpu className="h-5 w-5 mb-2" />
                        Free
                      </span>
                    </th>
                    <th className="px-6 py-4 text-center font-medium w-[180px] bg-primary/5">
                      <span className="flex flex-col items-center">
                        <Crown className="h-5 w-5 mb-2 text-primary" />
                        Pro
                      </span>
                    </th>
                    <th className="px-6 py-4 text-center font-medium w-[180px]">
                      <span className="flex flex-col items-center">
                        <Building className="h-5 w-5 mb-2" />
                        Enterprise
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4">Repository Limit</td>
                    <td className="px-6 py-4 text-center">1 per month</td>
                    <td className="px-6 py-4 text-center bg-primary/5">Unlimited</td>
                    <td className="px-6 py-4 text-center">Unlimited</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4">AI-Assisted Commits</td>
                    <td className="px-6 py-4 text-center">5 per month</td>
                    <td className="px-6 py-4 text-center bg-primary/5">50 per month</td>
                    <td className="px-6 py-4 text-center">Unlimited</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4">Code Modifications</td>
                    <td className="px-6 py-4 text-center">Read-only</td>
                    <td className="px-6 py-4 text-center bg-primary/5">Full access</td>
                    <td className="px-6 py-4 text-center">Advanced access</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4">Test Generation</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-4 w-4 text-destructive mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-primary/5">
                      Unit & Integration
                    </td>
                    <td className="px-6 py-4 text-center">
                      Unit, Integration & E2E
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4">AI Refactoring</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-4 w-4 text-destructive mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-primary/5">
                      <Check className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      Advanced
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4">CI/CD Automation</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-4 w-4 text-destructive mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-primary/5">
                      Basic
                    </td>
                    <td className="px-6 py-4 text-center">
                      Advanced
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4">AI Chat Assistant</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-4 w-4 text-destructive mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-primary/5">
                      Standard
                    </td>
                    <td className="px-6 py-4 text-center">
                      Priority
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-6 py-4">Enterprise Integrations</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-4 w-4 text-destructive mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center bg-primary/5">
                      <X className="h-4 w-4 text-destructive mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <PricingFaq />
      
      {/* CTA Section */}
      <div className="py-24 px-6 bg-gradient-to-b from-accent/10 to-background text-center">
        <div className="max-w-3xl mx-auto glass-card p-12 shadow-subtle-lg">
          <Zap className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-medium mb-5">Ready to accelerate your development?</h2>
          <p className="text-lg text-secondary mb-10 max-w-xl mx-auto">
            Upgrade to Pro and unlock the full potential of AI-powered development with CodePilot.AI.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Button size="lg" className="gap-2">
              <span>Upgrade to Pro</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              <span>Contact Sales</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

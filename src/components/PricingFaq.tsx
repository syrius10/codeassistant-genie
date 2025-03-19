
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PricingFaq = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const faqs = [
    {
      question: "How do I upgrade from Free to Pro?",
      answer: "You can upgrade to Pro at any time from your dashboard. Simply click on the 'Upgrade' button and follow the instructions to complete payment with your preferred method."
    },
    {
      question: "Can I switch between monthly and yearly billing?",
      answer: "Yes, you can switch between monthly and yearly billing at any time. If you switch from monthly to yearly, you'll immediately save the equivalent of 2 months. If you switch from yearly to monthly, the change will take effect on your next billing cycle."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), as well as PayPal. For Enterprise plans, we also offer invoice-based payment options."
    },
    {
      question: "Can I upgrade from Pro to Enterprise?",
      answer: "Yes, you can upgrade from Pro to Enterprise at any time. Contact our sales team to discuss your needs and we'll help transition your account to an Enterprise plan."
    },
    {
      question: "What happens if I exceed my monthly AI-assisted commit limit?",
      answer: "On the Free plan, once you reach your 5 commit limit, you'll need to wait until the next month or upgrade to Pro. On the Pro plan, if you exceed your 50 commit limit, you'll be prompted to upgrade to Enterprise or wait until the next billing cycle."
    },
    {
      question: "Is there a refund policy?",
      answer: "We offer a 14-day money-back guarantee for Pro plans. If you're not satisfied with our service, you can request a full refund within 14 days of your purchase. Enterprise plans come with a 30-day satisfaction guarantee."
    }
  ];

  return (
    <div className="py-24 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <div className={cn(
          "text-center mb-12 transition-all duration-700 ease-ios",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <h2 className="text-3xl font-medium mb-5 text-gradient-primary">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Find answers to common questions about our subscription plans.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className={cn(
                "glass-card mb-4 shadow-subtle overflow-hidden border-none transition-all duration-700 ease-ios",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                `animation-delay-${index * 100}`
              )}
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 text-secondary">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default PricingFaq;

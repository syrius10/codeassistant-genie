
import { ArrowRight, Cpu, Code, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const features = [
    "Intelligent Code Analysis",
    "Automated Refactoring",
    "AI-Powered Testing",
    "Performance Optimization"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTypingComplete(true);
    }, 3000);

    const featureInterval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(featureInterval);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 lg:px-8 pt-24 pb-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-primary/20 blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 left-1/4 -z-10 h-[250px] w-[250px] rounded-full bg-accent/20 blur-[100px] animate-float animation-delay-200" />
        <div className="absolute top-1/2 left-1/2 -z-10 h-[200px] w-[200px] rounded-full bg-secondary/20 blur-[100px] animate-float animation-delay-300" />
      </div>

      {/* Floating code particles */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="absolute text-primary/10 text-4xl font-mono animate-float" 
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {['{}', '()', '[]', '=>', '<>', '&&', '||'][Math.floor(Math.random() * 7)]}
          </div>
        ))}
      </div>

      {/* Icon animation */}
      <div className="relative mb-8 group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-xl transform scale-125 animate-pulse-slow" />
        <div className="relative glass rounded-full p-5 transition-all duration-300 transform group-hover:rotate-12">
          <Cpu className="h-10 w-10 text-accent animate-pulse-slow" />
        </div>
      </div>

      {/* Headline */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight mb-6 max-w-4xl">
        <div className="overflow-hidden mb-2">
          <span className="block animate-fade-up">
            <span className="text-gradient-primary">AI-Powered</span> Development Assistant
          </span>
        </div>
        <div className={`overflow-hidden transition-opacity duration-1000 ${isTypingComplete ? 'opacity-100' : 'opacity-0'}`}>
          <span className="block animate-fade-up animation-delay-200">
            Revolutionize Your <span className="text-gradient-primary">DevOps</span> Workflow
          </span>
        </div>
      </h1>

      {/* Animated feature text */}
      <div className="h-8 mb-8 text-center overflow-hidden">
        <div className="relative text-lg md:text-xl text-foreground/80 animate-fade-up animation-delay-300">
          <Sparkles className="inline-block h-5 w-5 mr-2 text-accent animate-pulse-slow" />
          <span>{features[activeFeature]}</span>
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-foreground/70 max-w-2xl text-center mb-10 animate-fade-up animation-delay-300">
        CodePilot.AI analyzes, optimizes, and deploys your code with the precision and elegance of advanced artificial intelligence.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-400">
        <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-glow-primary transition-all duration-300 button-glow">
          <Sparkles className="mr-2 h-4 w-4" />
          <span>Start Your Project</span>
        </Button>
        <Button size="lg" variant="outline" className="group hover:bg-secondary/10 transition-all duration-300">
          <span>Explore Features</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>

      {/* Stats with animations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl w-full">
        {[
          { label: "Code Coverage", value: "95%+" },
          { label: "Automated Testing", value: "100%" },
          { label: "Development Support", value: "24/7" }
        ].map((stat, index) => (
          <div 
            key={index}
            className="glass-card p-6 text-center card-hover overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <p className="text-4xl font-bold text-gradient-primary mb-2 relative z-10">{stat.value}</p>
            <p className="text-sm text-foreground/70 relative z-10">{stat.label}</p>
            <CheckCircle className="absolute bottom-3 right-3 h-6 w-6 text-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-primary/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse-slow" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

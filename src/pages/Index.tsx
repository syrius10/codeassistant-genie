
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AIFeatures from "@/components/AIFeatures";
import GitHubConnect from "@/components/GitHubConnect";
import AIAnalysis from "@/components/AIAnalysis";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <AIFeatures />
      <AIAnalysis />
      <GitHubConnect />
      <Footer />
    </div>
  );
};

export default Index;

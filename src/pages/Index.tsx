
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import GitHubConnect from "@/components/GitHubConnect";
import AIAnalysis from "@/components/AIAnalysis";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <AIAnalysis />
      <GitHubConnect />
      <Footer />
    </div>
  );
};

export default Index;

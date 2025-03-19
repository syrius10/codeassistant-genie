
import { Cpu, Github, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Cpu className="h-6 w-6 text-primary" />
              <span className="font-semibold text-xl">CodePilot.AI</span>
            </Link>
            <p className="text-secondary mb-6 max-w-md">
              AI-powered development assistant that revolutionizes the DevOps workflow with advanced code analysis, testing, and deployment automation.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-secondary hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-secondary hover:text-primary transition-colors">Features</a>
              </li>
              <li>
                <a href="#" className="text-secondary hover:text-primary transition-colors">Pricing</a>
              </li>
              <li>
                <a href="#" className="text-secondary hover:text-primary transition-colors">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-secondary hover:text-primary transition-colors">API</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-secondary hover:text-primary transition-colors">About</a>
              </li>
              <li>
                <a href="#" className="text-secondary hover:text-primary transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-secondary hover:text-primary transition-colors">Contact</a>
              </li>
              <li>
                <a href="#" className="text-secondary hover:text-primary transition-colors">Careers</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-secondary mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CodePilot.AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-secondary hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-secondary hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

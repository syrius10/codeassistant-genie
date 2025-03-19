
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardPlaceholder = () => {
  return (
    <div className="glass-card p-8 text-center">
      <h3 className="text-xl font-medium mb-4">Dashboard Preview</h3>
      <p className="text-secondary mb-6 max-w-md mx-auto">
        This is a preview of the CodePilot.AI dashboard. In a fully implemented version, you would see more detailed analytics and actionable insights.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Home</span>
          </Button>
        </Link>
        <Link to="/pricing">
          <Button className="gap-2">
            <span>View Pricing Plans</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPlaceholder;


import React from "react";
import { Github, GitBranch, GitCommit, Code, CheckSquare, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SubscriptionStatus from "@/components/SubscriptionStatus";

interface RepositoryOverviewProps {
  isLoading: boolean;
}

const RepositoryOverview = ({ isLoading }: RepositoryOverviewProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
      <div className="lg:col-span-2">
        <div className="glass-card p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Github className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-medium">user/repository</h2>
                <p className="text-sm text-secondary">Last analyzed 2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-secondary">
                <GitBranch className="h-4 w-4" />
                <span>main</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary">
                <GitCommit className="h-4 w-4" />
                <span>23 commits</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Code className="h-4 w-4 text-primary" />
                  Code Quality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold mb-1">87/100</div>
                <p className="text-xs text-secondary">3 improvement opportunities</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-primary" />
                  Test Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold mb-1">78%</div>
                <p className="text-xs text-secondary">12 new tests recommended</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold mb-1">A+</div>
                <p className="text-xs text-secondary">No critical vulnerabilities</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Subscription Status */}
      <div className="lg:col-span-1">
        <SubscriptionStatus />
      </div>
    </div>
  );
};

export default RepositoryOverview;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type Profile = Tables<"profiles">;

const Profile = () => {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      setLoadError(null);
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
        
      if (error) throw error;
      
      if (data) {
        setProfile(data);
      } else {
        // Handle case where profile doesn't exist
        toast({
          title: "Profile not found",
          description: "Your profile information could not be loaded.",
          variant: "destructive",
        });
        setLoadError("Profile not found. Please try refreshing the page.");
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      setLoadError(error.message || "Failed to load profile information");
      toast({
        title: "Error fetching profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user, toast]);

  if (loading || isLoading) {
    return <LoadingSpinner aria-label="Loading profile" />;
  }

  return (
    <ErrorBoundary>
      <div className="container max-w-4xl py-10 px-4 md:px-0">
        <ProfileHeader 
          title="User Profile" 
          description="Manage your personal information and account preferences" 
        />
        
        {loadError ? (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error loading profile</AlertTitle>
            <AlertDescription className="mt-2">
              <p>{loadError}</p>
              <Button 
                variant="outline" 
                size="sm"
                className="mt-4" 
                onClick={fetchProfile}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try again
              </Button>
            </AlertDescription>
          </Alert>
        ) : (
          <ProfileForm 
            user={user} 
            profile={profile} 
            setProfile={setProfile} 
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Profile;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

type Profile = Tables<"profiles">;

const Profile = () => {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          setProfile(data);
        }
      } catch (error: any) {
        toast({
          title: "Error fetching profile",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProfile();
  }, [user, toast]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container max-w-4xl py-10">
      <ProfileHeader 
        title="User Profile" 
        description="Manage your personal information" 
      />
      
      <ProfileForm 
        user={user} 
        profile={profile} 
        setProfile={setProfile} 
      />
    </div>
  );
};

export default Profile;

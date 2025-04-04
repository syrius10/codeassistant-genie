
import { useState } from "react";
import { Save, Loader2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";
import { User } from "@supabase/supabase-js";
import { AvatarSection } from "./AvatarSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/ThemeToggle";

type Profile = Tables<"profiles">;

interface ProfileFormProps {
  user: User | null;
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
}

export const ProfileForm = ({ user, profile, setProfile }: ProfileFormProps) => {
  const [username, setUsername] = useState<string>(profile?.username || "");
  const [isSaving, setIsSaving] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(profile?.avatar_url);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setIsSaving(true);
      setError(null);
      
      // Upload avatar if changed
      let newAvatarUrl = profile?.avatar_url;
      
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const filePath = `${user.id}-${Math.random()}.${fileExt}`;
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatarFile);
          
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);
          
        newAvatarUrl = data.publicUrl;
      }
      
      // Update profile
      const { error, data } = await supabase
        .from("profiles")
        .update({
          username,
          avatar_url: newAvatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      
      // Update local state
      if (data) {
        setProfile(data);
      }
      
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setError(error.message || "Failed to update profile");
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreferencesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSaving(true);
      
      // Here you would normally save preferences to the database
      // For this example, we'll just show a success toast
      
      toast({
        title: "Preferences updated",
        description: "Your preferences have been saved successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error saving preferences",
        description: error.message || "Failed to save preferences",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ErrorBoundary>
      <Card className="border rounded-xl shadow-md">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal details and preferences</CardDescription>
        </CardHeader>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 px-4">
            <TabsTrigger value="profile" id="profile-tab">
              Profile
            </TabsTrigger>
            <TabsTrigger value="preferences" id="preferences-tab">
              Preferences
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="pt-2">
            <form onSubmit={handleSubmit} aria-labelledby="profile-tab">
              <CardContent className="space-y-6">
                <div className={`flex ${isMobile ? 'flex-col items-center' : 'flex-row items-start'} space-y-4 sm:space-y-0 sm:space-x-6`}>
                  <AvatarSection 
                    user={user}
                    profile={profile}
                    avatarUrl={avatarUrl}
                    setAvatarUrl={setAvatarUrl}
                    avatarFile={avatarFile}
                    setAvatarFile={setAvatarFile}
                    username={username}
                    isSaving={isSaving}
                    setProfile={setProfile}
                  />
                  
                  <div className="w-full space-y-4">
                    <div>
                      <Label htmlFor="username" className="block mb-1">Username</Label>
                      <Input 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full"
                        placeholder="Enter your username"
                        disabled={isSaving}
                        aria-required="true"
                      />
                      <p className="mt-2 text-sm text-muted-foreground">
                        This is your public display name
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email" className="block mb-1">Email</Label>
                  <Input 
                    id="email" 
                    value={user?.email || ""} 
                    disabled 
                    className="w-full bg-muted text-muted-foreground"
                    aria-readonly="true"
                  />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your email address is managed through your account settings
                  </p>
                </div>
                
                {error && (
                  <div className="text-sm text-destructive">
                    {error}
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSaving} className="gap-2" aria-busy={isSaving}>
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Save className="h-4 w-4" aria-hidden="true" />
                  )}
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="preferences" className="pt-2">
            <form onSubmit={handlePreferencesSubmit} aria-labelledby="preferences-tab">
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Appearance</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="theme-toggle">Theme</Label>
                      <p className="text-sm text-muted-foreground">
                        Select light or dark theme
                      </p>
                    </div>
                    <ThemeToggle />
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium">Notifications</h3>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <Label htmlFor="email-notifications">Email notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive updates and alerts via email
                        </p>
                      </div>
                      <Switch 
                        id="email-notifications" 
                        checked={emailNotifications} 
                        onCheckedChange={setEmailNotifications}
                        disabled={isSaving}
                      />
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-medium">Privacy</h3>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <Label htmlFor="profile-visibility">Public profile</Label>
                        <p className="text-sm text-muted-foreground">
                          Make your profile visible to other users
                        </p>
                      </div>
                      <Switch 
                        id="profile-visibility" 
                        checked={true} 
                        disabled={isSaving}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isSaving} className="gap-2" aria-busy={isSaving}>
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Settings className="h-4 w-4" aria-hidden="true" />
                  )}
                  Save Preferences
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </ErrorBoundary>
  );
};

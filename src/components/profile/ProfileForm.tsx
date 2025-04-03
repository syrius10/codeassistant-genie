
import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";
import { User } from "@supabase/supabase-js";
import { AvatarSection } from "./AvatarSection";

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
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setIsSaving(true);
      
      // Upload avatar if changed
      let newAvatarUrl = profile?.avatar_url;
      
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const filePath = `${user.id}-${Math.random()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatarFile);
          
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);
          
        newAvatarUrl = data.publicUrl;
      }
      
      // Update profile
      const { error } = await supabase
        .from("profiles")
        .update({
          username,
          avatar_url: newAvatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
        
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      
      // Update local state
      setProfile({
        ...profile!,
        username,
        avatar_url: newAvatarUrl,
        updated_at: new Date().toISOString(),
      });
      
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your personal details and avatar</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
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
            
            <div className="w-full">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1"
              />
              <p className="mt-2 text-sm text-muted-foreground">
                This is your public display name
              </p>
            </div>
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              value={user?.email || ""} 
              disabled 
              className="mt-1 bg-muted text-muted-foreground"
            />
            <p className="mt-2 text-sm text-muted-foreground">
              Your email address is managed through your account settings
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isSaving} className="gap-2">
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

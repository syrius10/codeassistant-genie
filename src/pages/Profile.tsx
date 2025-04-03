
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { Loader2, User, Camera, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"profiles">;

const Profile = () => {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
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
          setUsername(data.username || "");
          setAvatarUrl(data.avatar_url);
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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    setAvatarFile(file);
    
    // Display preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setAvatarUrl(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = async () => {
    if (!user || !profile?.avatar_url) return;

    try {
      setIsSaving(true);
      
      // Extract the file path from the public URL
      const filePath = profile.avatar_url.split('/').pop();
      
      // Delete the file from storage
      if (filePath) {
        const { error: storageError } = await supabase.storage
          .from("avatars")
          .remove([`${user.id}-${filePath}`]);
        
        if (storageError) throw storageError;
      }
      
      // Update profile to remove avatar URL
      const { error } = await supabase
        .from("profiles")
        .update({
          avatar_url: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
        
      if (error) throw error;
      
      // Reset avatar state
      setAvatarUrl(null);
      setAvatarFile(null);
      
      toast({
        title: "Avatar Removed",
        description: "Your profile avatar has been removed successfully.",
      });
      
      // Update local state
      setProfile(prev => prev ? { ...prev, avatar_url: null } : null);
      
    } catch (error: any) {
      toast({
        title: "Error removing avatar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

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

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <p className="text-muted-foreground">Manage your personal information</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal details and avatar</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatarUrl || ""} alt={username} />
                  <AvatarFallback className="text-lg">
                    {username?.charAt(0)?.toUpperCase() || <User />}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 right-0 flex space-x-2">
                  <label 
                    htmlFor="avatar-upload" 
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Upload avatar</span>
                    <input 
                      id="avatar-upload" 
                      type="file" 
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden" 
                    />
                  </label>
                  {avatarUrl && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      disabled={isSaving}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove avatar</span>
                    </button>
                  )}
                </div>
              </div>
              
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
    </div>
  );
};

export default Profile;

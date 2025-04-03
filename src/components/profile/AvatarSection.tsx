
import { useState } from "react";
import { Camera, Trash2, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";
import { User } from "@supabase/supabase-js";

type Profile = Tables<"profiles">;

interface AvatarSectionProps {
  user: User | null;
  profile: Profile | null;
  avatarUrl: string | null;
  setAvatarUrl: (url: string | null) => void;
  setAvatarFile: (file: File | null) => void;
  avatarFile: File | null;
  username: string;
  isSaving: boolean;
  setProfile: (profile: Profile | null) => void;
}

export const AvatarSection = ({
  user,
  profile,
  avatarUrl,
  setAvatarUrl,
  setAvatarFile,
  avatarFile,
  username,
  isSaving,
  setProfile,
}: AvatarSectionProps) => {
  const { toast } = useToast();
  
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
    }
  };

  return (
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
  );
};

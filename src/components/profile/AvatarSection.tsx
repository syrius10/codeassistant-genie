
import { useState } from "react";
import { Camera, Trash2, Loader2, User as UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";
import { User } from "@supabase/supabase-js";
import { compressImage } from "@/utils/imageCompression";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    
    try {
      setIsCompressing(true);
      setError(null);
      
      // Compress image before uploading
      const compressedFile = await compressImage(file, {
        maxWidthOrHeight: 500,
        maxSizeInMB: 1,
        quality: 0.8
      });
      
      setAvatarFile(compressedFile);
      
      // Display preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatarUrl(e.target.result as string);
        }
      };
      reader.readAsDataURL(compressedFile);
      
      toast({
        title: "Image compressed",
        description: `Original: ${(file.size / 1024).toFixed(1)}KB, Compressed: ${(compressedFile.size / 1024).toFixed(1)}KB`,
      });
    } catch (error: any) {
      console.error("Image compression error:", error);
      setError("Failed to process image. Please try a different file.");
      toast({
        title: "Error processing image",
        description: error.message || "Failed to compress image",
        variant: "destructive",
      });
    } finally {
      setIsCompressing(false);
    }
  };

  const handleRemoveAvatar = async () => {
    if (!user || !profile?.avatar_url) return;

    try {
      setError(null);
      
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
      if (profile) {
        setProfile({
          ...profile,
          avatar_url: null
        });
      }
      
    } catch (error: any) {
      console.error("Error removing avatar:", error);
      setError(error.message || "Failed to remove avatar");
      toast({
        title: "Error removing avatar",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative">
        <Avatar className={isMobile ? "h-20 w-20" : "h-24 w-24"}>
          <AvatarImage 
            src={avatarUrl || ""} 
            alt={`${username}'s profile picture`}
            className="object-cover"
          />
          <AvatarFallback className="text-lg" aria-label={`${username}'s initials`}>
            {username?.charAt(0)?.toUpperCase() || <UserIcon aria-hidden="true" />}
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-2 right-0 flex space-x-2">
          <label 
            htmlFor="avatar-upload" 
            className={cn(
              "flex cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              isMobile ? "h-7 w-7" : "h-8 w-8"
            )}
            role="button"
            aria-label="Upload avatar"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                document.getElementById('avatar-upload')?.click();
              }
            }}
          >
            {isCompressing ? (
              <Loader2 className={cn("animate-spin", isMobile ? "h-3 w-3" : "h-4 w-4")} aria-hidden="true" />
            ) : (
              <Camera className={isMobile ? "h-3 w-3" : "h-4 w-4"} aria-hidden="true" />
            )}
            <span className="sr-only">Upload avatar</span>
            <input 
              id="avatar-upload" 
              type="file" 
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden" 
              aria-hidden="true"
              disabled={isCompressing || isSaving}
            />
          </label>
          {avatarUrl && (
            <button
              type="button"
              onClick={handleRemoveAvatar}
              disabled={isSaving || isCompressing}
              className={cn(
                "flex items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                isMobile ? "h-7 w-7" : "h-8 w-8"
              )}
              aria-label="Remove avatar"
            >
              <Trash2 className={isMobile ? "h-3 w-3" : "h-4 w-4"} aria-hidden="true" />
              <span className="sr-only">Remove avatar</span>
            </button>
          )}
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mt-2 p-2 text-sm">
          <AlertTriangle className="h-3 w-3" />
          <AlertTitle className="text-xs">Error</AlertTitle>
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}
      
      <p className="text-xs text-muted-foreground text-center mt-1">
        {isCompressing ? "Compressing image..." : "Upload an image (max 1MB)"}
      </p>
    </div>
  );
};

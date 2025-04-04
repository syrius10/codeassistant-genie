
import React from "react";

interface ProfileHeaderProps {
  title: string;
  description?: string;
}

export const ProfileHeader = ({ title, description }: ProfileHeaderProps) => {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-bold mb-2" tabIndex={0}>{title}</h1>
      {description && (
        <p className="text-muted-foreground max-w-2xl" tabIndex={0}>
          {description}
        </p>
      )}
    </div>
  );
};


import React from "react";

interface ProfileHeaderProps {
  title: string;
  description?: string;
}

export const ProfileHeader = ({ title, description }: ProfileHeaderProps) => {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
};

import React from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserProfileProps {
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ className }) => {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <div className="flex items-center">
        <Avatar>
          {user.photoURL ? (
            <AvatarImage src={user.photoURL} alt={user.name} />
          ) : (
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="ml-3">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>
      <Button
        onClick={logout}
        variant="outline"
        size="sm"
        className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
      >
        Sign out
      </Button>
    </div>
  );
};

export default UserProfile;

import React from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut } from "lucide-react";

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
        <Avatar className="border-2 border-primary/20">
          {user.photoURL ? (
            <AvatarImage src={user.photoURL} alt={user.name} />
          ) : (
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="ml-3 hidden md:block">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>
      <Button
        onClick={logout}
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 p-2 md:p-auto"
      >
        <LogOut className="h-4 w-4 md:mr-1" />
        <span className="hidden md:inline">Sign out</span>
      </Button>
    </div>
  );
};

export default UserProfile;

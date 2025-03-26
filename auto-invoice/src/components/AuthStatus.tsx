import React from "react";
import { useAuth } from "../context/AuthContext";

const AuthStatus: React.FC = () => {
  const { user, isAuthenticated, isLoading, authError } = useAuth();

  if (isLoading) {
    return (
      <div className="text-primary font-medium">
        Loading authentication state...
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="p-4 rounded-md mb-4 bg-primary/10 border border-primary/20 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
          <p className="text-primary font-semibold">Authenticated</p>
        </div>
        <p className="text-sm text-primary/80 mt-1 font-medium">
          Logged in as: {user.email}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 border border-destructive/20 bg-destructive/5 rounded-md mb-4 shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="h-2 w-2 rounded-full bg-destructive"></div>
        <p className="text-destructive font-semibold">Not authenticated</p>
      </div>
      <p className="text-sm text-destructive/80 mt-1 font-medium">
        Please sign in
      </p>
      {authError && (
        <div className="mt-3 p-3 text-sm bg-destructive/10 border border-destructive/30 rounded shadow-sm">
          <p className="font-semibold">Authentication Error:</p>
          <p className="mt-1">{authError}</p>
        </div>
      )}
    </div>
  );
};

export default AuthStatus;

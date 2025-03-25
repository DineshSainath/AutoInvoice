import React from "react";
import { useAuth } from "../context/AuthContext";
import { cn } from "../lib/utils";

const AuthStatus: React.FC = () => {
  const { user, isAuthenticated, isLoading, authError } = useAuth();

  if (isLoading) {
    return <div className="text-primary">Loading authentication state...</div>;
  }

  if (isAuthenticated && user) {
    return (
      <div className="p-4 border border-primary/20 bg-primary/5 rounded-md mb-4">
        <p className="text-primary font-semibold">Authenticated ✅</p>
        <p className="text-sm text-primary/80">Logged in as: {user.email}</p>
      </div>
    );
  }

  return (
    <div className="p-4 border border-destructive/20 bg-destructive/5 rounded-md mb-4">
      <p className="text-destructive font-semibold">Not authenticated ❌</p>
      <p className="text-sm text-destructive/80">Please sign in</p>
      {authError && (
        <div className="mt-2 p-2 text-sm bg-destructive/10 border border-destructive/30 rounded">
          <p className="font-medium">Authentication Error:</p>
          <p>{authError}</p>
        </div>
      )}
    </div>
  );
};

export default AuthStatus;

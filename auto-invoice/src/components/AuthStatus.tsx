import React from "react";
import { useAuth } from "../context/AuthContext";

const AuthStatus: React.FC = () => {
  const { user, isAuthenticated, isLoading, authError } = useAuth();

  if (isLoading) {
    return <div className="text-blue-500">Loading authentication state...</div>;
  }

  if (isAuthenticated && user) {
    return (
      <div className="p-4 border border-green-300 bg-green-50 rounded-md mb-4">
        <p className="text-green-700 font-semibold">Authenticated ✅</p>
        <p className="text-sm text-green-600">Logged in as: {user.email}</p>
      </div>
    );
  }

  return (
    <div className="p-4 border border-red-300 bg-red-50 rounded-md mb-4">
      <p className="text-red-700 font-semibold">Not authenticated ❌</p>
      <p className="text-sm text-red-600">Please sign in</p>
      {authError && (
        <div className="mt-2 p-2 text-sm bg-red-100 border border-red-300 rounded">
          <p className="font-medium">Authentication Error:</p>
          <p>{authError}</p>
        </div>
      )}
    </div>
  );
};

export default AuthStatus;

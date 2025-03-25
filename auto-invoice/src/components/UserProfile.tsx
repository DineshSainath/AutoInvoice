import React from "react";
import { useAuth } from "../context/AuthContext";

interface UserProfileProps {
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ className }) => {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center">
        {user.photoURL ? (
          <img
            className="h-8 w-8 rounded-full"
            src={user.photoURL}
            alt={user.name}
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-xs font-medium text-indigo-800">
              {user.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700">{user.name}</p>
          <p className="text-xs font-medium text-gray-500">{user.email}</p>
        </div>
      </div>
      <button
        onClick={logout}
        className="ml-4 px-3 py-1 text-xs font-medium text-red-700 hover:text-red-900"
      >
        Sign out
      </button>
    </div>
  );
};

export default UserProfile;

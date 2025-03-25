import React, { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import UserProfile from "./UserProfile";
import FirebaseLogin from "./FirebaseLogin";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">
                  Invoice Auto-Sender
                </h1>
              </div>
            </div>
            <div className="flex items-center">
              {isAuthenticated ? (
                <UserProfile />
              ) : (
                <div className="ml-3 relative">
                  <FirebaseLogin />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};

export default Layout;

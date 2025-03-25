import React, { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import UserProfile from "./UserProfile";
import FirebaseLogin from "./FirebaseLogin";
import { ThemeToggle } from "./theme-toggle";
import { FileText } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary rounded p-1 shadow-md">
              <FileText size={22} className="text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/70 bg-clip-text text-transparent">
                Invoice Auto-Sender
              </span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <UserProfile />
            ) : (
              <div className="relative">
                <FirebaseLogin />
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default Layout;

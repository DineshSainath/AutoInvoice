import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import FirebaseLogin from "../components/FirebaseLogin";
import AuthStatus from "../components/AuthStatus";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ThemeToggle } from "../components/theme-toggle";

const LoginPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // This would typically be used with a router to redirect after login
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      console.log("User is authenticated, should redirect to dashboard");
      // In a real app: navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
          Invoice Auto-Sender
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Sign in to manage your invoices efficiently
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="shadow-lg border-opacity-50 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary to-primary/40"></div>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-bold text-center">
              Welcome back
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthStatus />

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <FirebaseLogin className="w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;

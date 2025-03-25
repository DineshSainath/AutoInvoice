import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import FirebaseLogin from "../components/FirebaseLogin";

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Use your Google account to access Invoice Auto-Sender
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mt-6">
            <div className="flex flex-col items-center">
              <div className="w-full">
                <p className="text-sm font-medium text-gray-700 mb-4 text-center">
                  Sign in with Google to continue
                </p>
                <div className="flex justify-center">
                  <FirebaseLogin className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

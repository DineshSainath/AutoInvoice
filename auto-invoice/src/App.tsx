import React, { useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { auth } from "./services/firebase";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";

// Create a component that shows different content based on auth state
const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Invoice Auto-Sender</CardTitle>
          <CardDescription>
            Automatically update and send your invoices every month.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You're now logged in. You can start adding your invoices.
          </p>
        </CardContent>
        <CardFooter>
          <Button>Add Invoice</Button>
        </CardFooter>
      </Card>
    </Layout>
  );
};

function App() {
  useEffect(() => {
    console.log("Firebase Auth initialized:", !!auth);
    // Check if environment variables are loaded (without displaying values)
    console.log(
      "Firebase API Key exists:",
      !!process.env.REACT_APP_FIREBASE_API_KEY
    );
    console.log(
      "Firebase Project ID exists:",
      !!process.env.REACT_APP_FIREBASE_PROJECT_ID
    );
  }, []);

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

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
import { FileText, PlusCircle, ArrowRight } from "lucide-react";

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
      <div className="max-w-4xl mx-auto pt-6 md:pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Recent Invoices panel */}
          <Card className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
            <div className="h-1.5 bg-gradient-to-r from-primary to-primary/40"></div>
            <CardHeader className="pb-2 space-y-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Recent Invoices
                </CardTitle>
                <span className="text-xs font-medium py-1 px-2.5 bg-primary/10 text-primary rounded-full">
                  0 Invoices
                </span>
              </div>
              <CardDescription>
                Your most recent invoice activity
              </CardDescription>
            </CardHeader>
            <CardContent className="py-4">
              <div className="border border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center text-center">
                <div className="text-muted-foreground/30 mb-4">
                  <FileText className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-muted-foreground">
                  No invoices created yet. Create your first invoice to get
                  started.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <Button variant="outline" size="sm" className="text-xs">
                View All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs flex items-center gap-1"
              >
                View Details
                <ArrowRight className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>

          {/* Create Invoice panel with animation */}
          <Card className="shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full bg-primary/5 group hover:bg-primary/10">
            <div className="h-1.5 bg-gradient-to-r from-primary to-primary/40"></div>
            <CardHeader className="pb-2 space-y-2">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-primary" />
                Create Invoice
              </CardTitle>
              <CardDescription>Get started with a new invoice</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-8">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 group-hover:bg-primary/20">
                <PlusCircle className="h-12 w-12 text-primary group-hover:rotate-90 transition-all duration-300" />
              </div>
              <p className="text-center text-muted-foreground mb-8 max-w-xs mx-auto">
                Create a professional invoice in seconds
              </p>
              <Button
                size="lg"
                className="w-full py-6 text-base font-medium group-hover:bg-primary/90 group-hover:scale-105 transition-all duration-300"
              >
                Create New Invoice
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
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

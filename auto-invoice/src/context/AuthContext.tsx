import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  User as FirebaseUser,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  AuthError,
} from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  authError: string | null;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  loginWithGoogle: async () => {},
  logout: async () => {},
  authError: null,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

// Map Firebase user to our User type
const mapFirebaseUser = (firebaseUser: FirebaseUser): User => ({
  id: firebaseUser.uid,
  name: firebaseUser.displayName || "User",
  email: firebaseUser.email || "",
  photoURL: firebaseUser.photoURL || undefined,
});

// Helper function to extract error message from Firebase AuthError
const getFirebaseErrorMessage = (error: any): string => {
  if (error instanceof Error) {
    const authError = error as AuthError;

    // Common Firebase Auth error codes and friendly messages
    const errorMessages: Record<string, string> = {
      "auth/invalid-credential": "Invalid credentials. Please try again.",
      "auth/user-disabled": "This account has been disabled.",
      "auth/user-not-found": "No account found with this email.",
      "auth/wrong-password": "Incorrect password.",
      "auth/email-already-in-use": "Email already in use.",
      "auth/weak-password": "Password is too weak.",
      "auth/invalid-email": "Invalid email address.",
      "auth/account-exists-with-different-credential":
        "An account already exists with the same email address but different sign-in credentials.",
      "auth/popup-closed-by-user":
        "Sign-in canceled. You closed the sign-in window.",
      "auth/popup-blocked": "Sign-in popup was blocked by your browser.",
      "auth/network-request-failed":
        "Network error. Check your internet connection.",
    };

    // Return friendly message if available, otherwise the original message
    return errorMessages[authError.code] || authError.message;
  }

  return "An unknown authentication error occurred.";
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Listen for auth state changes
  useEffect(() => {
    console.log("Setting up auth state listener...");
    const unsubscribe = auth.onAuthStateChanged(
      (firebaseUser) => {
        console.log(
          "Auth state changed:",
          firebaseUser ? "User logged in" : "No user"
        );
        if (firebaseUser) {
          setUser(mapFirebaseUser(firebaseUser));
        } else {
          setUser(null);
        }
        setIsLoading(false);
      },
      (error) => {
        console.error("Auth state observer error:", error);
        setAuthError(getFirebaseErrorMessage(error));
        setIsLoading(false);
      }
    );

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Login with Google
  const loginWithGoogle = async () => {
    try {
      setAuthError(null);
      console.log("Attempting Google sign in...");
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        console.log("Google sign in successful");
        setUser(mapFirebaseUser(result.user));
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      const errorMessage = getFirebaseErrorMessage(error);
      setAuthError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setAuthError(null);
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      const errorMessage = getFirebaseErrorMessage(error);
      setAuthError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Value object that will be passed to consumers
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    loginWithGoogle,
    logout,
    authError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

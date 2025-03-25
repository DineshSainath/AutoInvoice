import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";

interface FirebaseLoginProps {
  className?: string;
}

const FirebaseLogin: React.FC<FirebaseLoginProps> = ({ className }) => {
  const { loginWithGoogle } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await loginWithGoogle();
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to sign in with Google"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <Button
        onClick={handleLogin}
        disabled={isLoading}
        className="w-full flex items-center space-x-2"
        size="lg"
      >
        {isLoading ? (
          <svg
            className="w-5 h-5 animate-spin mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.787-1.676-4.166-2.707-6.735-2.707-5.522 0-10 4.478-10 10s4.478 10 10 10c8.396 0 10.249-7.85 9.426-11.748l-9.426 0.087z" />
          </svg>
        )}
        <span>{isLoading ? "Signing in..." : "Sign in with Google"}</span>
      </Button>

      {error && (
        <div className="mt-2 p-2 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/30">
          {error}
        </div>
      )}
    </div>
  );
};

export default FirebaseLogin;

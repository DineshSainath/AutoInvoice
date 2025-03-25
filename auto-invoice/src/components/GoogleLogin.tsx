import React from "react";
import {
  GoogleLogin as ReactGoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { User } from "../types";

interface GoogleLoginProps {
  text?: "signin_with" | "signup_with" | "continue_with" | "signin";
  className?: string;
}

interface GoogleUserInfo {
  sub: string;
  name: string;
  email: string;
  picture?: string;
}

export const GoogleLogin: React.FC<GoogleLoginProps> = ({
  text,
  className,
}) => {
  const { loginWithGoogle } = useAuth();

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    try {
      if (credentialResponse.credential) {
        // Decode the JWT token from Google
        const decodedUser = jwtDecode<GoogleUserInfo>(
          credentialResponse.credential
        );

        // Map Google user info to our User type
        const user: User = {
          id: decodedUser.sub,
          name: decodedUser.name,
          email: decodedUser.email,
          photoURL: decodedUser.picture,
        };

        // Login the user - we now use Firebase auth directly
        loginWithGoogle();
      }
    } catch (error) {
      console.error("Error during Google authentication:", error);
    }
  };

  const handleError = () => {
    console.error("Login Failed");
  };

  return (
    <div className={className}>
      <ReactGoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        text={text}
        useOneTap
      />
    </div>
  );
};

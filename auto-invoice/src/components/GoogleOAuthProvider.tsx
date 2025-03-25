import React, { ReactNode } from "react";
import { GoogleOAuthProvider as ReactGoogleOAuthProvider } from "@react-oauth/google";

interface GoogleOAuthProviderProps {
  children: ReactNode;
  clientId: string;
}

const GoogleOAuthProvider: React.FC<GoogleOAuthProviderProps> = ({
  children,
  clientId,
}) => {
  return (
    <ReactGoogleOAuthProvider clientId={clientId}>
      {children}
    </ReactGoogleOAuthProvider>
  );
};

export default GoogleOAuthProvider;

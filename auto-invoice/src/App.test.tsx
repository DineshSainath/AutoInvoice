import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock the Google OAuth implementation
jest.mock("@react-oauth/google", () => ({
  GoogleLogin: ({
    onSuccess,
    text,
  }: {
    onSuccess: (res: { credential: string }) => void;
    text?: string;
  }) => (
    <button
      onClick={() => onSuccess({ credential: "mock-token" })}
      data-testid="google-login"
    >
      {text || "Sign in with Google"}
    </button>
  ),
  GoogleOAuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock the JWT decode function
jest.mock("jwt-decode", () => ({
  jwtDecode: () => ({
    sub: "test-id",
    name: "Test User",
    email: "test@example.com",
  }),
}));

test("renders login page when not authenticated", () => {
  render(<App />);
  const headingElement = screen.getByText(/Sign in to your account/i);
  expect(headingElement).toBeInTheDocument();
});

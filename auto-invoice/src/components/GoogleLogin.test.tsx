import React from "react";
import { render, screen } from "@testing-library/react";
import { GoogleLogin } from "./GoogleLogin";
import { AuthProvider } from "../context/AuthContext";

// Mock the Google OAuth implementation
jest.mock("@react-oauth/google", () => ({
  GoogleLogin: ({
    onSuccess,
    text,
  }: {
    onSuccess: (res: { credential: string }) => void;
    text?: "signin_with" | "signup_with" | "continue_with" | "signin";
  }) => (
    <button
      onClick={() => onSuccess({ credential: "mock-token" })}
      data-testid="google-login"
    >
      {text || "Sign in with Google"}
    </button>
  ),
}));

describe("GoogleLogin Component", () => {
  test("renders Google login button", () => {
    render(
      <AuthProvider>
        <GoogleLogin />
      </AuthProvider>
    );

    const loginButton = screen.getByTestId("google-login");
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveTextContent("Sign in with Google");
  });

  test("renders custom button text when provided", () => {
    render(
      <AuthProvider>
        <GoogleLogin text="signin_with" />
      </AuthProvider>
    );

    const loginButton = screen.getByTestId("google-login");
    expect(loginButton).toHaveTextContent("signin_with");
  });
});

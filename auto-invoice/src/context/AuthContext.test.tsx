import React from "react";
import { render, screen, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext";

// Mock Firebase auth
jest.mock("../services/firebase", () => ({
  auth: {
    onAuthStateChanged: (callback: any) => {
      callback(null);
      return jest.fn();
    },
  },
  googleProvider: {},
}));

// Mock Firebase auth functions
jest.mock("firebase/auth", () => ({
  signInWithPopup: jest.fn(() =>
    Promise.resolve({
      user: {
        uid: "123",
        displayName: "Test User",
        email: "test@example.com",
        photoURL: null,
      },
    })
  ),
  signOut: jest.fn(() => Promise.resolve()),
}));

// Mock component that uses the auth context
const TestComponent = () => {
  const { user, isAuthenticated, loginWithGoogle, logout } = useAuth();

  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? "authenticated" : "not-authenticated"}
      </div>
      {user && <div data-testid="user-email">{user.email}</div>}
      <button onClick={() => loginWithGoogle()} data-testid="login-button">
        Login
      </button>
      <button onClick={() => logout()} data-testid="logout-button">
        Logout
      </button>
    </div>
  );
};

describe("AuthContext", () => {
  test("provides authentication state and methods", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Initially not authenticated
    expect(screen.getByTestId("auth-status")).toHaveTextContent(
      "not-authenticated"
    );

    // Test login
    await act(async () => {
      screen.getByTestId("login-button").click();
    });

    expect(screen.getByTestId("auth-status")).toHaveTextContent(
      "authenticated"
    );
    expect(screen.getByTestId("user-email")).toHaveTextContent(
      "test@example.com"
    );

    // Test logout
    await act(async () => {
      screen.getByTestId("logout-button").click();
    });

    expect(screen.getByTestId("auth-status")).toHaveTextContent(
      "not-authenticated"
    );
  });
});

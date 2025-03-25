/**
 * Base API service for handling HTTP requests
 */

// Base URL for the API
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

// Default headers for API requests with proper TypeScript type
const defaultHeaders: Record<string, string> = {
  "Content-Type": "application/json",
};

// Helper function to handle response
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "An error occurred");
  }

  return response.json();
};

/**
 * Basic HTTP methods for API calls
 */
export const api = {
  get: async (endpoint: string, token?: string) => {
    const headers = { ...defaultHeaders };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers,
    });

    return handleResponse(response);
  },

  post: async (endpoint: string, data: any, token?: string) => {
    const headers = { ...defaultHeaders };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  put: async (endpoint: string, data: any, token?: string) => {
    const headers = { ...defaultHeaders };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    return handleResponse(response);
  },

  delete: async (endpoint: string, token?: string) => {
    const headers = { ...defaultHeaders };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers,
    });

    return handleResponse(response);
  },
};

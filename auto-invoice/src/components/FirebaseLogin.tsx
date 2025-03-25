import React from "react";
import { useAuth } from "../context/AuthContext";

interface FirebaseLoginProps {
  className?: string;
}

const FirebaseLogin: React.FC<FirebaseLoginProps> = ({ className }) => {
  const { loginWithGoogle } = useAuth();

  return (
    <button
      onClick={loginWithGoogle}
      className={`flex items-center justify-center w-full px-4 py-2 space-x-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
    >
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.787-1.676-4.166-2.707-6.735-2.707-5.522 0-10 4.478-10 10s4.478 10 10 10c8.396 0 10.249-7.85 9.426-11.748l-9.426 0.087z" />
      </svg>
      <span>Sign in with Google</span>
    </button>
  );
};

export default FirebaseLogin;

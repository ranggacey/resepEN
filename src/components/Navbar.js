"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar({ theme, toggleTheme }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="h-8 w-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg transform group-hover:rotate-12 transition-all duration-300" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-300">
              MultiEnding
            </span>
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 relative"
            aria-label="Toggle theme"
          >
            <div className="w-6 h-6 relative">
              {/* Sun Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 text-yellow-500 absolute inset-0 transition-all duration-300 ${
                  theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                />
              </svg>

              {/* Moon Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 text-blue-400 absolute inset-0 transition-all duration-300 ${
                  theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
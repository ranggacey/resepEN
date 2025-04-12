"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Prevent flash of wrong theme before mount
  if (!mounted) {
    return (
      <html lang="en">
        <body className="bg-white">
          <div className="h-screen flex items-center justify-center">
            Loading...
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={theme}>
      <body className={`
        bg-white dark:bg-gray-900 
        text-gray-900 dark:text-gray-100
        transition-colors duration-300
        min-h-screen
      `}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
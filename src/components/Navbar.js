"use client";

import Link from "next/link";

export default function Navbar({ theme, toggleTheme }) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-darkBg border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between shadow-md">
      {/* Logo / Brand */}
      <Link href="/" className="text-2xl font-pixel text-black dark:text-white">
        MyGameRPG
      </Link>

      {/* Tombol Toggle Dark/Light */}
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white text-sm rounded hover:bg-blue-600 dark:hover:bg-blue-800 transition-colors duration-200"
      >
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </nav>
  );
}

"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Mengambil preferensi tema dari localStorage
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <html lang="en">
      <body className="bg-white dark:bg-darkBg transition-colors duration-300">
        {/* Navbar tetap */}
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        {/* Padding top untuk mencegah konten tertutup Navbar */}
        <div className="pt-20">{children}</div>
      </body>
    </html>
  );
}

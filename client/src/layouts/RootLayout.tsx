import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
// import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const RootLayout = () => {
  const { mode, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col ${mode === "dark" ? "dark" : ""}`}
    >
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - Replace with your logo */}
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              <a href="/">StayLume</a>
            </div>

            {/* Navigation Links - Replace with your menu items */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="/hotels"
                className="text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
              >
                Hotels
              </a>
              <a
                href="/about"
                className="text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
              >
                About
              </a>
              <a
                href="/contact"
                className="text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
              >
                Contact
              </a>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                aria-label="Toggle theme"
              >
                {mode === "dark" ? "🌞" : "🌙"}
              </button>

              <div className="hidden md:flex items-center space-x-3">
                <a
                  href="/login"
                  className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                >
                  Sign Up
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button className="md:hidden p-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="md:hidden hidden">
            {/* Mobile navigation links */}
          </div>
        </nav>
      </header>

      <main className="grow pt-20">
        <Outlet />
      </main>

      <Footer mode={mode} />
    </div>
  );
};

export default RootLayout;

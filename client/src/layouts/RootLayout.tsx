import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
// import { useTheme } from "../hooks/useTheme";
// import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

const RootLayout = () => {
  // const { mode, toggleTheme } = useTheme();
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
    <div className={`min-h-screen flex flex-col`}>
      <Header isScrolled={isScrolled} />

      <main className="grow pt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;

import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { navLinks } from "../../constants/navigation";

interface HeaderProps {
  isScrolled: boolean;
}

const Header = ({ isScrolled }: HeaderProps) => {
  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-bg-primary ${
        isScrolled ? "backdrop-blur-md shadow-lg" : ""
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-10">
            <Link to="/" className="flex items-center justify-center gap-3">
              <img src={logo} alt="Staylume Logo" />
              <span className="text-xl font-bold font-beVietnamPro text-primary">
                Staylume
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `transition duration-300 text-sm ${
                      isActive
                        ? "text-accent font-bold border-b-2 border-accent pb-1"
                        : "text-text-secondary font-medium hover:text-emerald-600"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Theme Toggle Button */}
            {/* <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle theme"
            >
              {mode === "dark" ? "🌞" : "🌙"}
            </button> */}

            <div className="hidden md:flex items-center space-x-3">
              <Link
                to="/login"
                className="px-5 py-2.5 text-text-tertiary hover:bg-[1E293B] transition rounded-lg font-bold text-sm font-beVietnamPro"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 bg-accent text-text-primary rounded-lg hover:bg-accent-hover transition font-bold text-sm font-beVietnamPro"
              >
                Register
              </Link>
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

        <div className="md:hidden hidden">{/* Mobile navigation links */}</div>
      </nav>
    </header>
  );
};

export default Header;

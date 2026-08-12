import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const mobileMenuStyles =
    "flex flex-col absolute top-0 left-0 w-full h-full bg-black px-10 py-40 text-5xl font-bold";

  return (
    <nav className="flex items-center justify-between p-10 text-white bg-gray-900 md:px-20">
      {/* Logo and Site Name */}
      <Link
        to="/"
        className="flex items-center gap-3 z-10 md:py-3 font-bold text-xl lg:text-3xl"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/en/d/d0/Guru_Nanak_Dev_Engineering_College%2C_Bidar_logo.jpg"
          alt="GNDEC Logo"
          className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-white"
        />
          DORMLINK BRIDGING HOSTEL LIFE
      </Link>

      {/* Navigation Links */}
      <div
        className={`${
          menuOpen ? mobileMenuStyles : "hidden md:flex"
        } gap-10 md:static md:flex-row`}
        onClick={() => setMenuOpen(false)} // ✅ closes menu after click (important fix)
      >
        <Link
          to="/about"
          className="md:py-3 hover:text-blue-500 transition-all ease-linear"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="md:py-3 hover:text-blue-500 transition-all ease-linear"
        >
          Contact
        </Link>
        <Link
          to="/auth/request"
          className="md:py-3 hover:text-blue-500 transition-all ease-linear"
        >
          Request
        </Link>
        <Link
          to="/auth/admin-login"
          className="md:py-3 hover:text-blue-500 transition-all ease-linear"
        >
          Admin Login
        </Link>
        <Link
          to="/auth/login"
          className="md:bg-blue-500 md:hover:bg-blue-700 transition text-white font-bold md:text-lg md:py-3 md:px-8 md:rounded"
        >
          Login
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div
        className="md:hidden z-10 py-1 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          // Close (X) icon when menu is open
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          // Menu (hamburger) icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </div>
    </nav>
  );
}

export { Navbar };

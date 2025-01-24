import React from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = user
    ? [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/add-stock", label: "Add Stock" },
        { to: "/edit-stock/:id", label: "Edit Stock" },
        { to: "/stock-list", label: "Stock List" },
        { to: "/portfolio-insights", label: "Insights" },
        { to: "/profile", label: "Profile" },
      ]
    : [
        { to: "/login", label: "Login" },
        { to: "/register", label: "Register" },
      ];

  return (
    <nav className="bg-gray-200 text-white shadow-lg sticky top-0 z-20">
      <div className="container mx-auto flex justify-between items-center h-15 p-2">
        <h1 className="text-4xl font-bold tracking-wide">
          <Link to="/dashboard">Portfolio Tracker</Link>
        </h1>

        <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>

        <ul className="hidden lg:flex space-x-8 items-center text-lg">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.to}>{item.label}</Link>
            </li>
          ))}
          {user && (
            <li>
              <button onClick={logout} className="text-red-500 hover:text-red-700 transition duration-300">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-indigo-700">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link to={item.to} onClick={toggleMenu}>
                  {item.label}
                </Link>
              </li>
            ))}
            {user && (
              <li>
                <button onClick={logout} className="text-red-500 hover:text-red-700 transition duration-300">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

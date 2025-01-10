import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Hamburger icon

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu on mobile view
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-indigo-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-3xl font-bold tracking-wide hover:text-indigo-200 transition duration-300">
          <Link to="/">Portfolio Tracker</Link>
        </h1>

        {/* Hamburger Icon (Mobile) */}
        <div className="lg:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <FaTimes size={24} className="text-white" />
          ) : (
            <FaBars size={24} className="text-white" />
          )}
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8 text-lg">
          <li className="hover:text-indigo-300 transition duration-300">
            <Link to="/add-stock">Add Stock</Link>
          </li>
          <li className="hover:text-indigo-300 transition duration-300">
            <Link to="/edit-stock/:id">Edit Stock</Link>
          </li>
          <li className="hover:text-indigo-300 transition duration-300">
            <Link to="/">Dashboard</Link>
          </li>
          <li className="hover:text-indigo-300 transition duration-300">
            <Link to="/stock-list">Stocks</Link>
          </li>
          <li className="hover:text-indigo-300 transition duration-300">
            <Link to="/portfolio-insights">Insights</Link>
          </li>
          <li className="hover:text-indigo-300 transition duration-300">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="hover:text-indigo-300 transition duration-300">
            <Link to="/login">Login</Link>
          </li>
          <li className="hover:text-indigo-300 transition duration-300">
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu (Toggled) */}
      <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} bg-indigo-700`}>
        <ul className="flex flex-col items-center space-y-4 py-4">
          <li className="text-lg hover:text-indigo-300 transition duration-300">
            <Link to="/add-stock">Add Stock</Link>
          </li>
          <li className="text-lg hover:text-indigo-300 transition duration-300">
            <Link to="/edit-stock/:id">Edit Stock</Link>
          </li>
          <li className="text-lg hover:text-indigo-300 transition duration-300">
            <Link to="/">Dashboard</Link>
          </li>
          <li className="text-lg hover:text-indigo-300 transition duration-300">
            <Link to="/stock-list">Stocks</Link>
          </li>
          <li className="text-lg hover:text-indigo-300 transition duration-300">
            <Link to="/portfolio-insights">Insights</Link>
          </li>
          <li className="text-lg hover:text-indigo-300 transition duration-300">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="text-lg hover:text-indigo-300 transition duration-300">
            <Link to="/login">Login</Link>
          </li>
          <li className="text-lg hover:text-indigo-300 transition duration-300">
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

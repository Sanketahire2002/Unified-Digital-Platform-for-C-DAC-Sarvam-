import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logo.png'; // Adjust the path accordingly
import gif from './logo.gif'; // Path to your GIF file
import './Navbar.css'; // Import the CSS for styling

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false); // State to handle mobile menu toggle

  // Toggle mobile menu visibility
  const handleToggle = () => {
    setIsMobile(!isMobile);
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark" style={{ backgroundColor: '#000' }}>
      <div className="container-fluid">
        {/* Logo and GIF */}
        <NavLink to="/" className="navbar-brand">
          <img
            src={logo}
            alt="Company Logo"
            className="logo-img"
            width="40" // Adjust width as needed
          />
          <img
            src={gif}
            alt="Company GIF"
            className="gif-img"
            width="40" // Adjust width as needed
          />
        </NavLink>

        {/* Hamburger Icon for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isMobile ? 'true' : 'false'}
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${isMobile ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link fw-bold fs-4 me-3">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link fw-bold fs-4 me-3">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link fw-bold fs-4 me-3">Contact Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/placement" className="nav-link fw-bold fs-4 me-3">Placement</NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? 'btn btn-primary fw-bold fs-4 navbar-login-black-button'
                    : 'btn fw-bold fs-4 navbar-login-black-button'
                }
                style={({ isActive }) => ({
                  border: '2px solid white', // Always a solid white border
                  color: isActive ? 'white' : 'black' // Optional: change text color if active
                })}
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

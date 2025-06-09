import React, { useState } from 'react';
import './Navbar.css';
import LOGO from '../assets/nav-logo.png';
import JobDialog from './JobDialog';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <nav className="navbar">
      <div>
        <div className="logo">
        <img src={LOGO} alt="logo" />
      </div>
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </div>

      {/* Wrap nav-links and button in one container */}
      <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Find Jobs</a></li>
          <li><a href="#">Find Talents</a></li>
          <li><a href="#">About us</a></li>
          <li><a href="#">Testimonials</a></li>
        </ul>

        <button className="create-btn" onClick={handleOpenDialog}>
          <span className="default-text">Create Jobs</span>
          <span className="hover-text">Login</span>
        </button>
      </div>

      <JobDialog open={dialogOpen} handleClose={handleCloseDialog} />
    </nav>
  );
}

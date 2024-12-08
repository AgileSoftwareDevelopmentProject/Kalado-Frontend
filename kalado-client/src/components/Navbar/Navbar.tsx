import React from 'react';
import './Navbar.css';
import { FaSearch } from 'react-icons/fa';

const Navbar: React.FC = () => {
  return (
    <div className="page-container">
      <nav className="navbar">
        {/* Logo */}
        <div className="navbar-logo">کالادو</div>

        {/* Search Bar */}
        <div className="navbar-search">
          <input type="text" placeholder="جستجوی کالا" />
          <button aria-label="search">
            <FaSearch />
          </button>
        </div>

        {/* Buttons */}
        <div className="navbar-buttons">
          <button className="navbar-button signup">ثبت آگهی</button>
          <button className="navbar-button login">ورود/ثبت‌نام</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
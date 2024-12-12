import React from 'react';
import './Navbar.css';
import { FaSearch } from 'react-icons/fa';

interface NavbarProps {
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <img src="/images/logo.png" alt="کالادو" className="navbar-logo" />

        <div className="navbar-search">
          <input type="text" placeholder="جستجوی کالا" />
          <button aria-label="search">
            <FaSearch />
          </button>
        </div>

        <div className="navbar-buttons">
          <button className="navbar-button login" onClick={onLoginClick}>ورود/ثبت‌نام</button>
          <button className="navbar-button signup">ثبت آگهی</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
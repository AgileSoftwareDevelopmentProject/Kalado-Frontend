import React from 'react';
import './Navbar.css';
import '../Common.css';
import { FaSearch } from 'react-icons/fa';

interface NavbarProps {
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  return (
    <nav className="navbar">
      <img src="/images/logo.png" alt="کالادو" className="logo" />

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
  );
};

export default Navbar;
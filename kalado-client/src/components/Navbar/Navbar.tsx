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
        <div className="navbar-logo">کالادو</div>

        <div className="navbar-search">
          <input type="text" placeholder="جستجوی کالا" />
          <button>
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
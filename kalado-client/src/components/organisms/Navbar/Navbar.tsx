import React from 'react';
import './Navbar.css';
import '../../Common.css';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';


interface NavbarProps {
  onLoginClick: () => void;
  onCreateAdClick: () => void;
  isLoggedIn: boolean;
  onProfileClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onCreateAdClick, isLoggedIn, onProfileClick }) => {

  return (
    <nav className="navbar">
      <Link to="/">
        <img src="/images/logo.png" alt="کالادو" className="logo" />
      </Link>

      <div className="navbar-search">
        <input type="text" placeholder="جستجوی کالا" />
        <button aria-label="search">
          <FaSearch />
        </button>
      </div>
      <div className="navbar-buttons">
        {isLoggedIn ? (
          <button className="navbar-button profile" onClick={onProfileClick}>پروفایل کاربری</button>
        ) : (
          <button className="navbar-button login" onClick={onLoginClick}>ورود/ثبت‌نام</button>
        )}
        <button className="navbar-button createAd" onClick={onCreateAdClick}>ثبت آگهی</button>
      </div>
    </nav>
  );
};

export default Navbar;
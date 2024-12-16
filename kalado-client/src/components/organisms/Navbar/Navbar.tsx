import React from 'react';
import './Navbar.css';
import Button from '../../atoms/Button/Button';
import Logo from '../../atoms/Logo/Logo';
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
        <Logo />
      </Link>

      <div className="navbar-search">
        <input type="text" placeholder="جستجوی کالا" />
        <button aria-label="search">
          <FaSearch />
        </button>
      </div>
      <div className="navbar-buttons">
        {isLoggedIn ? (
          <Button
            text="پروفایل کاربری"
            onClick={onProfileClick}>
          </Button>
        ) : (
          <Button
            text="ورود/ثبت‌نام"
            backgroundColor="transparent"
            onClick={onLoginClick}>
          </Button>
        )}
        <Button
          text="ثبت آگهی"
          onClick={onCreateAdClick}>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
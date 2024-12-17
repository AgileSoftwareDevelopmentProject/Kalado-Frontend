import React, { useState } from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import Logo from '../../atoms/Logo/Logo';
import CustomButton from '../../atoms/Buttons/CustomButton';
import SearchBar from '../../molecules/SearchBar/SearchBar';

interface NavbarProps {
  onLoginClick: () => void;
  onCreateAdClick: () => void;
  isLoggedIn: boolean;
  onProfileClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onCreateAdClick, isLoggedIn, onProfileClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'transparent', width: '100%', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 5, ml: 10, mr: 10 }}>
        <Logo />

        <Box sx={{ flexGrow: 1, mx: 2 }}>
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={handleSearch}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {isLoggedIn ? (
            <CustomButton text="پروفایل کاربری" onClick={onProfileClick} />
          ) : (
            <CustomButton text="ورود/ثبت‌نام" backgroundColor="transparent" onClick={onLoginClick} />
          )}
          <CustomButton text="ثبت آگهی" onClick={onCreateAdClick} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

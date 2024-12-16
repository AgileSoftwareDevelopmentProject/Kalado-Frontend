import React, { useState } from 'react';
import { AppBar, Toolbar, Button as MuiButton, Box } from '@mui/material';
import Logo from '../../atoms/Logo/Logo';
import Button from '../../atoms/Buttons/Button';
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
    // Add your search logic here (e.g., API call)
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#272C48', width: '100%' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            <Button text="پروفایل کاربری" onClick={onProfileClick} />
          ) : (
            <Button text="ورود/ثبت‌نام" backgroundColor="transparent" onClick={onLoginClick} />
          )}
          <Button text="ثبت آگهی" onClick={onCreateAdClick} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

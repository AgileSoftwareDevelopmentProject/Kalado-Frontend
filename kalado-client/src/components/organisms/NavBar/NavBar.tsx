import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Box } from '@mui/material';
import { Logo, CustomButton } from '../../atoms';
import { SearchBar } from '../../molecules';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

interface NavBarProps {
  onLoginClick?: () => void;
  onCreateAdClick: () => void;
  isLoggedIn: boolean;
  onProfileClick?: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ onLoginClick, onCreateAdClick, isLoggedIn, onProfileClick, toggleTheme, isDarkMode }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  return (
    <AppBar position="fixed" sx={{ width: '100%', backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 5, ml: 10, mr: 10 }}>
        <Logo />

        <Box sx={{ flexGrow: 1, mx: 2 }}>
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={handleSearch}
          />
        </Box>

        <CustomButton
          icon={isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          onClick={toggleTheme}
          color="inherit"
          padding="5px 5px"
          backgroundColor="transparent"
        />

        <Box sx={{ display: 'flex', gap: 1 }}>
          {isLoggedIn ? (
            <CustomButton text={t('navbar.profile')} backgroundColor="transparent" onClick={onProfileClick} />
          ) : (
            <CustomButton text={t('navbar.login/signup')} backgroundColor="transparent" onClick={onLoginClick} />
          )}
          <CustomButton text={t('navbar.create_ad')} onClick={onCreateAdClick} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Box, IconButton } from '@mui/material';
import { Logo, CustomButton } from '../../atoms';
import { SearchBar } from '../../molecules';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAuth } from '../../../contexts/AuthContext';

interface NavBarProps {
  onLoginClick?: () => void;
  onCreateAdClick: () => void;
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
  isInProfile?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({
  onLoginClick,
  onCreateAdClick,
  onProfileClick,
  onLogoutClick,
  toggleTheme,
  isDarkMode,
  isInProfile
}) => {
  const { t, i18n } = useTranslation();
  const { token } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fa' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'fa' ? 'rtl' : 'ltr';
  };

  return (
    <AppBar position="fixed" sx={{ width: '100%', backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 5, ml: 10, mr: 10 }}>
        <Logo />

        <Box sx={{ flexGrow: 1, mx: 2, textAlign: i18n.language === 'fa' ? 'right' : 'left' }}>
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={handleSearch}
          />
        </Box>

        <IconButton onClick={toggleLanguage} color="secondary">
          {i18n.language === 'en' ? "Fa" : "En"}
        </IconButton>

        <IconButton onClick={toggleTheme} color="secondary">
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {!!token ? (
            isInProfile ? (
              <CustomButton text={t('navbar.logout')} onClick={onLogoutClick} />
            ) : (
              <CustomButton text={t('navbar.profile')} onClick={onProfileClick} />
            )
          ) : (
            <CustomButton text={t('navbar.login/signup')} onClick={onLoginClick} />
          )}
          <CustomButton text={t('navbar.create_ad')} onClick={onCreateAdClick} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

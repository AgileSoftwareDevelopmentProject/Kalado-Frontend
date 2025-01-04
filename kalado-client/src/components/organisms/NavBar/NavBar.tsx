import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Box, IconButton, useTheme } from '@mui/material';
import { Logo, CustomButton } from '../../atoms';
import { SearchBar } from '../../molecules';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAuth } from '../../../contexts/AuthContext';
import { useThemeContext } from '../../../contexts/ThemeContext';

interface NavBarProps {
  onLoginClick?: () => void;
  onCreateAdClick: () => void;
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
  isInProfile?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({
  onLoginClick,
  onCreateAdClick,
  onProfileClick,
  onLogoutClick,
  isInProfile
}) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const { token } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // TODO Seacrch API
  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fa' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'fa' ? 'rtl' : 'ltr';
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: 'none'
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 5, ml: 10, mr: 10 }}>
        <Logo />

        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
        />

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

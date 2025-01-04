import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Box, IconButton, useTheme } from '@mui/material';
import { Logo, CustomButton } from '../../atoms';
import { SearchBar } from '../../molecules';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAuth, useThemeContext, useModalContext, useLanguageContext } from '../../../contexts';

interface NavBarProps {
  isInProfile?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({
  isInProfile
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { token } = useAuth();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const { currentLanguage, toggleLanguage } = useLanguageContext();
  const [searchQuery, setSearchQuery] = useState('');
  const {
    handleOpenLogin,
    handleOpenCreateAd,
    handleOpenProfilePage,
    handleLogoutClick,
  } = useModalContext();

  // TODO Seacrch API
  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
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
          {currentLanguage === 'en' ? "Fa" : "En"}
        </IconButton>

        <IconButton onClick={toggleTheme} color="secondary">
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {!!token ? (
            isInProfile ? (
              <CustomButton text={t('navbar.logout')} onClick={handleLogoutClick} />
            ) : (
              <CustomButton text={t('navbar.profile')} onClick={handleOpenProfilePage} />
            )
          ) : (
            <CustomButton text={t('navbar.login/signup')} onClick={handleOpenLogin} />
          )}
          <CustomButton text={t('navbar.create_ad')} onClick={handleOpenCreateAd} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

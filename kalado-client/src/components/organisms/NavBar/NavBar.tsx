import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Box, IconButton, useTheme } from '@mui/material';
import { Logo, CustomButton } from '../../atoms';
import { SearchBar } from '../../molecules';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAuth, useThemeContext, useModalContext, useLanguageContext } from '../../../contexts';
import { toast } from 'react-toastify';


const NavBar: React.FC = () => {
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
    isInProfile,
  } = useModalContext();

  // TODO Seacrch API
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await searchByKeyword(searchQuery);
    if (response.isSuccess) {

    } else {
      toast(response.message);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: 'none'
      }}
    >
      <Toolbar sx={{ display: 'flex', mt: 5, ml: 10, mr: 10 }}>
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

        <Box sx={{ display: 'flex' }}>
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

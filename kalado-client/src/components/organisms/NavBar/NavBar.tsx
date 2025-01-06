import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Box, IconButton, useTheme } from '@mui/material';
import { Logo, CustomButton } from '../../atoms';
import { SearchBar } from '../../molecules';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAuth, useThemeContext, useModalContext, useLanguageContext } from '../../../contexts';
import { OptionsComponent } from '../../../constants/options';
import { useProductContext } from '../../../contexts';


const NavBar: React.FC = () => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const { currentLanguage, toggleLanguage } = useLanguageContext();
  const { handleOpenLogin, handleOpenCreateAd, handleOpenProfilePage, handleLogoutClick, isInProfile } = useModalContext();
  const { searchProductsByKeyword } = useProductContext();
  const [searchQuery, setSearchQuery] = useState('');
  const { search_options } = OptionsComponent();

  // Rendering products based on keyword search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchProductsByKeyword(searchQuery);
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
          options={search_options}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
        />

        <IconButton onClick={toggleLanguage} color="secondary">
          {currentLanguage === 'en' ? "Fa" : "En"}
        </IconButton>

        <IconButton onClick={toggleTheme} color="secondary">
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon sx={{ color: '#363e6b' }} />}
        </IconButton>

        <Box sx={{ display: 'flex' }}>
          {(token !== null) ? (
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

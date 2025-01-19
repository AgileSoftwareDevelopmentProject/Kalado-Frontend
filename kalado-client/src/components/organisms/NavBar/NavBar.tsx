import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Box, IconButton, useTheme } from '@mui/material';
import { Logo, CustomButton } from '../../atoms';
import { SearchBar } from '../../molecules';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { OptionsComponent } from '../../../constants/options';
import { toggleTheme } from '../../../features/theme/themeSlice';
import { toggleLanguage } from '../../../features/language/languageSlice';
import { openLogin, openCreateAd, openDashboard, logout } from '../../../features/modal/modalSlice';
// import { fetchProductsByKeyword } from '../../../features/product/productSlice';


const NavBar: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const isInProfile = useSelector((state) => state.auth.isInProfile);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const currentLanguage = useSelector((state) => state.language.currentLanguage);

  const [searchQuery, setSearchQuery] = useState('');
  const { search_options } = OptionsComponent();

  // Rendering products based on keyword search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // dispatch(fetchProductsByKeyword(searchQuery));
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

        <IconButton onClick={() => dispatch(toggleLanguage())} color="secondary">
          {currentLanguage === 'en' ? "Fa" : "En"}
        </IconButton>

        <IconButton onClick={() => dispatch(toggleTheme())} color="secondary">
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        <Box sx={{ display: 'flex' }}>
          {(token !== null) ? (
            isInProfile ? (
              <CustomButton text={t('navbar.logout')} onClick={() => dispatch(logout())} />
            ) : (
              <CustomButton text={t('navbar.profile')} onClick={() => dispatch(openDashboard())} />
            )
          ) : (
            <CustomButton text={t('navbar.login/signup')} onClick={() => dispatch(openLogin())} />
          )}
          <CustomButton text={t('navbar.create_ad')} onClick={() => dispatch(openCreateAd())} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

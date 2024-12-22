import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Box } from '@mui/material';
import { Logo, CustomButton } from '../../atoms';
import { SearchBar } from '../../molecules';

interface NavBarProps {
  onLoginClick: () => void;
  onCreateAdClick: () => void;
  isLoggedIn: boolean;
  onProfileClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onLoginClick, onCreateAdClick, isLoggedIn, onProfileClick }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#272C48', width: '100%', boxShadow: 'none' }}>
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

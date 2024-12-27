import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { NavBar, Category, Filter, LoginForm, SignupForm, CreateAdForm, ItemsHolder } from '../../components/organisms';
import { Backdrop } from '../../components/atoms';
import mockData from '../../mockData.json';


const items = mockData.Items;

const Landing = () => {
    const navigate = useNavigate();

    const [isLoginVisible, setLoginVisible] = useState(false);
    const [isSignupVisible, setSignupVisible] = useState(false);
    const [isCreateAdVisible, setCreateAdVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedCategoryTitle, setSelectedCategoryTitle] = useState<string | null>('املاک');

    const handleOpenLogin = () => {
        setLoginVisible(true);
        setSignupVisible(false);
        setCreateAdVisible(false);
    };

    const handleCloseLogin = () => setLoginVisible(false);

    const handleOpenSignup = () => {
        setLoginVisible(false);
        setSignupVisible(true);
        setCreateAdVisible(false);
    };

    const handleCloseSignup = () => {
        setSignupVisible(false);
    };

    const handleOpenCreateAd = () => {
        setCreateAdVisible(true);
        setSignupVisible(false);
        setLoginVisible(false);
    };

    const handleCloseCreateAd = () => {
        setCreateAdVisible(false);
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        handleCloseLogin();
    };

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('backdrop')) {
            handleCloseLogin();
            handleCloseSignup();
            handleCloseCreateAd();
        }
    };

    const handleOpenProfilePage = () => {
        navigate('/dashboard');
    }

    const handleSelectCategory = (categoryTitle: string) => {
        setSelectedCategoryTitle(categoryTitle);
    };

    return (
        <Box>
            <NavBar onLoginClick={handleOpenLogin} onCreateAdClick={handleOpenCreateAd} isLoggedIn={isLoggedIn} onProfileClick={handleOpenProfilePage} />

            <Category onSelectCategory={handleSelectCategory} />
            <Filter />

            <Box sx={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'flex-end', paddingTop: '200px', paddingRight: '200px' }}>
                <Typography variant="h4" sx={{ textAlign: 'center', mt: 4, color: "#FFFFFF", mb: 10, fontWeight: 'bold' }}>
                    {selectedCategoryTitle ? selectedCategoryTitle : "Select a Category"}
                </Typography>
                <ItemsHolder items={items} onItemSelect={(itemId) => navigate(`/item/${itemId}`)} />
            </Box>

            {isLoginVisible && (
                <Backdrop open={isLoginVisible} onClick={handleBackdropClick}>
                    <LoginForm onClose={handleCloseLogin} onOpenSignup={handleOpenSignup} onLoginSuccess={handleLoginSuccess} />
                </Backdrop>
            )}
            {isSignupVisible && (
                <Backdrop open={isSignupVisible} onClick={handleBackdropClick}>
                    <SignupForm onClose={handleCloseSignup} onOpenLogin={handleOpenLogin} />
                </Backdrop>
            )}
            {isCreateAdVisible && (
                <Backdrop open={isCreateAdVisible} onClick={handleBackdropClick}>
                    <CreateAdForm onClose={handleCloseCreateAd} />
                </Backdrop>
            )}
        </Box>
    );
};

export default Landing;

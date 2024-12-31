import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { NavBar, SideBarMenu, Filter, LoginForm, SignupForm, CreateAdForm, CodeVerification, ItemsHolder } from '../../components/organisms';
import { SideBar } from '../../components/molecules';
import { Backdrop } from '../../components/atoms';
import mockData from '../../mockData.json';
import { FaHome, FaCar, FaLaptop, FaGamepad, FaSuitcase, FaPlusCircle, FaUtensils } from 'react-icons/fa';
import { toast } from 'react-toastify';

const items = mockData.Items;

interface LandingProps {
    toggleTheme: () => void;
    isDarkMode: boolean;
}

const Landing: React.FC<LandingProps> = ({ toggleTheme, isDarkMode }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isLoginVisible, setLoginVisible] = useState(false);
    const [isSignupVisible, setSignupVisible] = useState(false);
    const [isCodeVerificationVisible, setCodeVerificationVisible] = useState(false);
    const [isCreateAdVisible, setCreateAdVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [userRole, setUserRole] = useState<string | null>('USER');
    const [userEmail, setUserEmail] = useState<string>('');
    const [selectedCategoryTitle, setSelectedCategoryTitle] = useState<string | null>(t("category.one"));

    const categories = [
        { titleKey: "category.one", icon: <FaHome /> },
        { titleKey: "category.two", icon: <FaCar /> },
        { titleKey: "category.three", icon: <FaUtensils /> },
        { titleKey: "category.four", icon: <FaLaptop /> },
        { titleKey: "category.five", icon: <FaGamepad /> },
        { titleKey: "category.six", icon: <FaSuitcase /> },
        { titleKey: "category.seven", icon: <FaPlusCircle /> },
    ];

    const handleSelectCategory = (categoryKey: string) => {
        setSelectedCategoryTitle(t(categoryKey));
    };

    useEffect(() => {
        if (categories.length > 0) {
            setSelectedCategoryTitle(t(categories[0].titleKey));
        }
    }, [t]);

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
        if (!isLoggedIn) {
            toast.error(t("error.create_ad.disable_not_loggined"));
            return;
        }
        setCreateAdVisible(true);
        setSignupVisible(false);
        setLoginVisible(false);
    };

    const handleCloseCreateAd = () => {
        setCreateAdVisible(false);
    };

    const handleCloseCodeVerification = () => {
        setCodeVerificationVisible(false);
    };

    const handleOpenCodeVerification = (email: string) => {
        setUserEmail(email);
        setCodeVerificationVisible(true);
        handleCloseSignup();
    };

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('backdrop')) {
            handleCloseLogin();
            handleCloseSignup();
            handleCloseCreateAd();
        }
    };

    const handleLoginSuccess = (role: string) => {
        setUserRole(role);
        setIsLoggedIn(true);
        handleCloseLogin();
    };

    const handleOpenProfilePage = () => {
        if (userRole === 'ADMIN') {
            navigate('/admin-dashboard');
        } else if (userRole === 'USER') {
            navigate('/user-dashboard');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <NavBar
                onLoginClick={handleOpenLogin}
                onCreateAdClick={handleOpenCreateAd}
                isLoggedIn={isLoggedIn}
                onProfileClick={handleOpenProfilePage}
                toggleTheme={toggleTheme}
                isDarkMode={isDarkMode}
            />

            <SideBar>
                <SideBarMenu
                    categories={categories.map(cat => ({
                        title: t(cat.titleKey),
                        icon: cat.icon
                    }))}
                    onSelectCategory={handleSelectCategory}
                    title={t("category.title")}
                />
                <Filter />
            </SideBar>

            <ItemsHolder items={items} onItemSelect={(itemId) => navigate(`/item/${itemId}`)} selectedCategoryTitle={selectedCategoryTitle} />

            {isLoginVisible && (
                <Backdrop open={isLoginVisible} onClick={handleBackdropClick}>
                    <LoginForm onClose={handleCloseLogin} onOpenSignup={handleOpenSignup} onLoginSuccess={handleLoginSuccess} />
                </Backdrop>
            )}
            {isSignupVisible && (
                <Backdrop open={isSignupVisible} onClick={handleBackdropClick}>
                    <SignupForm
                        onClose={handleCloseSignup}
                        onOpenLogin={handleOpenLogin}
                        onSignUpSuccess={handleOpenCodeVerification}
                    />
                </Backdrop>
            )}
            {isCreateAdVisible && (
                <Backdrop open={isCreateAdVisible} onClick={handleBackdropClick}>
                    <CreateAdForm onClose={handleCloseCreateAd} />
                </Backdrop>
            )}
            {isCodeVerificationVisible && (
                <Backdrop open={isCodeVerificationVisible} onClick={handleBackdropClick}>
                    <CodeVerification email={userEmail} onClose={handleCloseCodeVerification} />
                </Backdrop>
            )}
        </Box>
    );
};

export default Landing;

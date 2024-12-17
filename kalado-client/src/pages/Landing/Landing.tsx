import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Navbar from '../../components/organisms/Navbar/Navbar';
import Category from '../../components/organisms/Category/Category';
import Filter from '../../components/organisms/Filter/Filter';
import ItemCard from '../../components/organisms/ItemCard/ItemCard';
import LoginForm from '../../components/organisms/Login/LoginForm';
import SignupForm from '../../components/organisms/Signup/SignupForm';
import CreateAdForm from '../../components/organisms/CreateAd/CreateAdForm';
import Backdrop from '../../components/atoms/Backdrop/Backdrop';

interface Item {
    title: string;
    imageUrl: string;
    price: number;
    city: string;
    date: string;
    itemId: string;
}

const items: Item[] = [
    {
        title: 'Samsung A54',
        imageUrl: 'https://example.com/samsung-a54.jpg',
        price: 15000000,
        city: 'تهران',
        date: 'دقایقی پیش',
        itemId: '1'
    },
    {
        title: 'Iphone 15',
        imageUrl: 'https://example.com/iphone-15.jpg',
        price: 60000000,
        city: 'شیراز',
        date: 'یک ساعت پیش',
        itemId: '2'
    },
    {
        title: 'Xiaomi Redmi Note 11',
        imageUrl: 'https://example.com/redmi-note-11.jpg',
        price: 8000000,
        city: 'اصفهان',
        date: 'دو ساعت پیش',
        itemId: '3'
    },
    {
        title: 'OnePlus Nord CE 5G',
        imageUrl: 'https://example.com/nord-ce-5g.jpg',
        price: 12000000,
        city: 'مشهد',
        date: 'سه ساعت پیش',
        itemId: '4'
    },
    {
        title: 'Google Pixel 6a',
        imageUrl: 'https://example.com/pixel-6a.jpg',
        price: 9000000,
        city: 'تبریز',
        date: 'چهار ساعت پیش',
        itemId: '5'
    },
    {
        title: 'Oppo Reno8 Pro',
        imageUrl: 'https://example.com/oppo-reno8-pro.jpg',
        price: 11000000,
        city: 'شیراز',
        date: 'پنج ساعت پیش',
        itemId: '6'
    },
];

const Landing = () => {
    const navigate = useNavigate();

    const [isLoginVisible, setLoginVisible] = useState(false);
    const [isSignupVisible, setSignupVisible] = useState(false);
    const [isCreateAdVisible, setCreateAdVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    const handleBackdropClick = (event) => {
        const target = event.target;
        if (target.classList.contains('backdrop')) {
            handleCloseLogin();
            handleCloseSignup();
            handleCloseCreateAd();
        }
    };

    const handleOpenProfilePage = () => {
        navigate('/dashboard');
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Navbar onLoginClick={handleOpenLogin} onCreateAdClick={handleOpenCreateAd} isLoggedIn={isLoggedIn} onProfileClick={handleOpenProfilePage} />
            <Box>
                <Category />
                <Filter />
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', paddingBottom: '20px', paddingRight: '20px' }}>
                <Grid container spacing={2}>
                    {items.map(item => (
                        <Grid item xs={12} sm={6} md={4} key={item.itemId}>
                            <ItemCard
                                title={item.title}
                                price={`تومان ${item.price.toLocaleString()}`}
                                city={item.city}
                                date={item.date}
                                image={item.imageUrl || '/assets/images/default-image-url.jpg'}
                                onClick={() => navigate(`/item/${item.itemId}`)}
                            />
                        </Grid>
                    ))}
                </Grid>
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Navbar from '../../components/organisms/Navbar/Navbar';
import CategoryList from '../../components/molecules/Lists/CategoryList';
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
        imageUrl: '',
        price: 15000000,
        city: 'تهران',
        date: 'دقایقی پیش',
        itemId: '1'
    },
    {
        title: 'Iphone 15',
        imageUrl: '',
        price: 60000000,
        city: 'شیراز',
        date: 'یک ساعت پیش',
        itemId: '2'
    },
    {
        title: 'Iphone 15',
        imageUrl: '',
        price: 60000000,
        city: 'شیراز',
        date: 'یک ساعت پیش',
        itemId: '3'
    },
    {
        title: 'Iphone 15',
        imageUrl: '',
        price: 60000000,
        city: 'شیراز',
        date: 'یک ساعت پیش',
        itemId: '4'
    },
];


const Landing: React.FC = () => {

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

    const handleBackdropClick = (event: React.MouseEvent, handleClose: () => void) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('backdrop')) {
            handleClose();
        }
    };

    const handleOpenProfilePage = () => {
        navigate('/profile');
    }

    return (
        <Box>
            <Navbar onLoginClick={handleOpenLogin} onCreateAdClick={handleOpenCreateAd} isLoggedIn={isLoggedIn} onProfileClick={handleOpenProfilePage} />
            {/* <CategoryList /> */}
            {/* <Filter /> */}
            {/* <Grid container spacing={2}>
                {items.map(item => (
                    <Grid item xs={12} sm={6} md={4} key={item.itemId}>
                        <ItemCard
                            title={item.title}
                            price={`تومان ${item.price.toLocaleString()}`}
                            city={item.city}
                            date={item.date}
                            image={item.imageUrl || 'default-image-url.jpg'}
                            onClick={() => console.log(`Item clicked: ${item.title}`)}
                        />
                    </Grid>
                ))}
            </Grid> */}

            {isLoginVisible && (
                <Backdrop onClick={(event) => handleBackdropClick(event, handleCloseLogin)}>
                    <LoginForm onClose={handleCloseLogin} onOpenSignup={handleOpenSignup} onLoginSuccess={handleLoginSuccess} />
                </Backdrop>
            )}
            {isSignupVisible && (
                <Backdrop onClick={(event) => handleBackdropClick(event, handleCloseSignup)}>
                    <SignupForm onClose={handleCloseSignup} onOpenLogin={handleOpenLogin} />
                </Backdrop>
            )}
            {isCreateAdVisible && (
                <Backdrop onClick={(event) => handleBackdropClick(event, handleCloseCreateAd)}>
                    <CreateAdForm onClose={handleCloseCreateAd} />
                </Backdrop>
            )}
        </Box>
    );
};

export default Landing;

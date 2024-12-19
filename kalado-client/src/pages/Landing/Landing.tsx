import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import NavBar from '../../components/organisms/NavBar/NavBar';
import Category from '../../components/organisms/Category/Category';
import Filter from '../../components/organisms/Filter/Filter';
import ItemCard from '../../components/organisms/ItemCard/ItemCard';
import LoginForm from '../../components/organisms/Login/LoginForm';
import SignupForm from '../../components/organisms/Signup/SignupForm';
import CreateAdForm from '../../components/organisms/CreateAd/CreateAdForm';
import Backdrop from '../../components/atoms/Backdrop/Backdrop';
import mockData from '../../mockData.json';
import defaultImage from '../../assets/images/default-image-url.jpg';

interface Item {
    title: string;
    imageUrl: string;
    price: number;
    city: string;
    date: string;
    itemId: string;
}

const items: Item[] = mockData.Items

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
        <Box>
            <NavBar onLoginClick={handleOpenLogin} onCreateAdClick={handleOpenCreateAd} isLoggedIn={isLoggedIn} onProfileClick={handleOpenProfilePage} />
            <Category />
            <Filter />
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', paddingTop: '200px', paddingRight: '200px' }}>
                <Grid container spacing={2}>
                    {items.map(item => (
                        <Grid item xs={12} sm={6} md={4} key={item.itemId}>
                            <ItemCard
                                title={item.title}
                                price={`تومان ${item.price.toLocaleString()}`}
                                city={item.city}
                                date={item.date}
                                image={item.imageUrl || defaultImage}
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import Navbar from '../../components/organisms/Navbar/Navbar';
import CategorySidebar from '../../components/organisms/Category/Category';
import Filter from '../../components/organisms/Filter/Filter';
import ItemCard from '../../components/organisms/ItemCard/ItemCard';
import LoginForm from '../../components/organisms/Login/LoginForm';
import SignupForm from '../../components/organisms/Signup/SignupForm';
import CreateAdForm from '../../components/organisms/CreateAd/CreateAdForm';
import Backdrop from '../../components/atoms/Backdrop/Backdrop';
import PrimarySearchAppBar from './PrimarySearchAppBar';

interface Item {
    title: string;
    imageUrl: string;
    price: number;
    city: string;
    date: string;
    itemId: string;
}

const items: Item[] = [];

const Landing: React.FC = () => {

    const navigate = useNavigate();

    const [isLoginVisible, setLoginVisible] = useState(false);
    const [isSignupVisible, setSignupVisible] = useState(false);
    const [isCreateAdVisible, setCreateAdVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState<string>('');

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

    const handleLoginSuccess = (username: string) => {
        setIsLoggedIn(true);
        setUsername(username);
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
        <div className="landing-page">
            {/* <PrimarySearchAppBar /> */}
            <Navbar onLoginClick={handleOpenLogin} onCreateAdClick={handleOpenCreateAd} isLoggedIn={isLoggedIn} onProfileClick={handleOpenProfilePage} />
            <CategorySidebar />
            <Filter />
            <div className="item-cards-container">
                {items.map(item => (
                    <ItemCard
                        key={item.itemId}
                        title={item.title}
                        imageUrl={item.imageUrl}
                        price={item.price}
                        city={item.city}
                        date={item.date}
                        itemId={item.itemId}
                    />
                ))}
            </div>
            {isLoginVisible && (
                <>
                    <Backdrop onClick={(event) => handleBackdropClick(event, handleCloseLogin)}>
                        <LoginForm onClose={handleCloseLogin} onOpenSignup={handleOpenSignup} onLoginSuccess={handleLoginSuccess} />
                    </Backdrop>
                </>
            )}
            {isSignupVisible && (
                <>
                    <Backdrop onClick={(event) => handleBackdropClick(event, handleCloseSignup)}>
                        <SignupForm onClose={handleCloseSignup} onOpenLogin={handleOpenLogin} />
                    </Backdrop>
                </>
            )}
            {isCreateAdVisible && (
                <>
                    <Backdrop onClick={(event) => handleBackdropClick(event, handleCloseCreateAd)}>
                        <CreateAdForm onClose={handleCloseCreateAd} />
                    </Backdrop>
                </>
            )}
        </div>
    );
};

export default Landing;

import React, { useState } from 'react';
import './Landing.css';
import Navbar from '../../components/Navbar/Navbar';
import CategorySidebar from '../../components/Category/Category';
import Filter from '../../components/Filter/Filter';
import ItemCard from '../../components/Advertisement/ItemCard';
import LoginForm from '../../components/Login/LoginForm';
import SignupForm from '../../components/Signup/SignupForm';
import CreateAdForm from '../../components/Advertisement/CreateAdForm';
import Backdrop from '../../components/Other/Backdrop';


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

    const [isLoginVisible, setLoginVisible] = useState(false);
    const [isSignupVisible, setSignupVisible] = useState(false);
    const [isCreateAdVisible, setCreateAdVisible] = useState(false);

    const handleOpenLogin = () => {
        setLoginVisible(true);
        setSignupVisible(false);
        setCreateAdVisible(false);
    };

    const handleCloseLogin = () => {
        setLoginVisible(false);
    };

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

    const handleBackdropClick = (event: React.MouseEvent, handleClose: () => void) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('backdrop')) {
            handleClose();
        }
    };

    return (
        <div className="landing-page">
            <Navbar onLoginClick={handleOpenLogin} onCreateAdClick={handleOpenCreateAd} />
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
                        <LoginForm onClose={handleCloseLogin} onOpenSignup={handleOpenSignup} />
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

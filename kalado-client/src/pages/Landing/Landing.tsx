import React, { useState } from 'react';
import './Landing.css';
import Navbar from '../../components/Navbar/Navbar';
import CategorySidebar from '../../components/Category/Category';
import Filter from '../../components/Filter/Filter';
import ItemCard from '../../components/Advertisement/ItemCard';
import LoginForm from '../../components/Login/LoginForm';
import SignupForm from '../../components/Signup/SignupForm';


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

    const handleOpenLogin = () => {
        setLoginVisible(true);
        setSignupVisible(false);
    };

    const handleCloseLogin = () => {
        setLoginVisible(false);
    };

    const handleOpenSignup = () => {
        setLoginVisible(false);
        setSignupVisible(true);
    };

    const handleCloseSignup = () => {
        setSignupVisible(false);
    };

    return (
        <div className="landing-page">
            <Navbar onLoginClick={handleOpenLogin} />
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

            {isLoginVisible && <LoginForm onClose={handleCloseLogin} onOpenSignup={handleOpenSignup} />}
            {isSignupVisible && <SignupForm onClose={handleCloseSignup} onOpenLogin={handleOpenLogin} />}
        </div>
    );
};

export default Landing;

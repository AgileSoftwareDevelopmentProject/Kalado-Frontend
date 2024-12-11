import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import ItemCard from '../components/Advertisement/ItemCard';
import LoginForm from '../components/Login/LoginForm';
import SignupForm from '../components/Signup/SignupForm';
import './Landing.css';

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
    const [isLoginVisible, setLoginVisible] = useState(false);
    const [isSignUpVisible, setSignUpVisible] = useState(false);

    const handleOpenLogin = () => {
        setLoginVisible(true);
        setSignUpVisible(false);
    };

    const handleCloseLogin = () => {
        setLoginVisible(false);
    };

    const handleOpenSignUp = () => {
        setLoginVisible(false);
        setSignUpVisible(true);
    };

    const handleCloseSignUp = () => {
        setSignUpVisible(false);
    };

    return (
        <div className="landing-page">
            <Navbar onLoginClick={handleOpenLogin} />
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

            {isLoginVisible && <LoginForm onClose={handleCloseLogin} onOpenSignUp={handleOpenSignUp} />}
            {isSignUpVisible && <SignupForm onClose={handleCloseSignUp} onOpenLogin={handleOpenLogin} />}
        </div>
    );
};

export default Landing;

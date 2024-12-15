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

const mockItems: Item[] = [
    {
      title: 'Test Item 1',
      imageUrl: '/images/test1.jpg',
      price: 1500000,
      city: 'Tehran',
      date: '۱۴۰۲/۹/۲۴',
      itemId: '1',
    },
    {
      title: 'Test Item 2',
      imageUrl: '/images/test2.jpg',
      price: 1200000,
      city: 'Shiraz',
      date: '۱۴۰۲/۹/۲۵',
      itemId: '2',
    },
  ];
  
  const Landing: React.FC = () => {
    const [isLoginVisible, setLoginVisible] = useState(false);
    const [isSignupVisible, setSignupVisible] = useState(false);
  
    const handleOpenLogin = () => {
      setLoginVisible(true);
      setSignupVisible(false);
    };
  
    const handleCloseLogin = () => setLoginVisible(false);
  
    const handleOpenSignup = () => {
      setSignupVisible(true);
      setLoginVisible(false);
    };
  
    const handleCloseSignup = () => setSignupVisible(false);
  
    return (
      <div className="landing-page">
        <Navbar onLoginClick={handleOpenLogin} />
        <CategorySidebar />
        <Filter />
        <div className="item-cards-container" data-testid="item-cards-container">
          {mockItems.map((item) => (
            <ItemCard
              key={item.itemId}
              title={item.title}
              image={item.imageUrl}
              price={`$${item.price}`}
              city={item.city}
              date={item.date}
              onClick={() => {}}
            />
          ))}
        </div>
  
        {isLoginVisible && <LoginForm onClose={handleCloseLogin} onOpenSignup={handleOpenSignup} />}
        {isSignupVisible && <SignupForm onClose={handleCloseSignup} onOpenLogin={handleOpenLogin} />}
      </div>
    );
  };
  
  export default Landing;
  
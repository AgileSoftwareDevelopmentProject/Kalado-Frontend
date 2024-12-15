import React from 'react';
import './ItemCard.css';

interface ItemCardProps {
  title: string;
  price: string; // Updated to match the type used in the test case
  city: string;
  date: string;
  image: string;
  onClick: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ title, price, city, date, image, onClick }) => {
  return (
    <div className="item-card" role="button" aria-label={title} onClick={onClick}>
      <div className="item-content">
        <div className="item-details">
          <h3 className="item-title">{title}</h3>
          <p className="item-price">{price}</p>
          <p className="item-city">{city}</p>
          <p className="item-date">{date}</p>
        </div>
        <img src={image} alt={title} className="item-image" />
      </div>
    </div>
  );
};

export default ItemCard;
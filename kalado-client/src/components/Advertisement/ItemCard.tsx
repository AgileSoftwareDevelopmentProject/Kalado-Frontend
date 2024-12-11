import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ItemCard.css';

interface ItemCardProps {
    title: string;
    price: number;
    city: string;
    date: string;
    itemId: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ title, price, city, date, itemId }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/item/${itemId}`);
    };

    return (
        <div className="marketplace-card" onClick={handleClick}>
            <h3 className="item-title">{title}</h3>
            <p className="item-price">${price.toFixed(2)}</p>
            <p className="item-city">{city}</p>
            <p className="item-date">{new Date(date).toLocaleDateString()}</p>
        </div>
    );
};

export default ItemCard;

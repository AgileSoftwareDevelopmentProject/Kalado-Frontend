import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ItemCard.css';

interface ItemCardProps {
    title: string;
    imageUrl: string;
    price: number;
    city: string;
    date: string;
    itemId: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ title, imageUrl, price, city, date, itemId }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/item/${itemId}`);
    };

    return (
        <div className="item-card" onClick={handleClick}>
            <div className="item-content">
                <div className="item-details">
                    <h3 className="item-title">{title}</h3>
                    <p className="item-price">{`${new Intl.NumberFormat('fa-IR').format(price)} تومان`}</p>
                    <p className="item-city">{city}</p>
                    <p className="item-date">{new Date(date).toLocaleDateString()}</p>
                </div>
                <img src={imageUrl} alt={title} className="item-image" />
            </div>
        </div>
    );
};

export default ItemCard;

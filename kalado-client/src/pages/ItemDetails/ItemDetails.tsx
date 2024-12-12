import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ItemDetails.css';

interface Item {
    title: string;
    imageUrl: string;
    price: number;
    city: string;
    date: string;
    sellerPhone: string;
}

const ItemDetails: React.FC = () => {
    const { itemId } = useParams<{ itemId: string }>();
    const [item, setItem] = useState<Item | null>(null);

    useEffect(() => {
        const fetchItemDetails = async () => {
            const response = await fetch(`https://api.example.com/items/${itemId}`);
            const data = await response.json();
            setItem(data);
        };

        fetchItemDetails();
    }, [itemId]);

    if (!item) return <div>Loading...</div>;

    const handleCallSeller = () => {
        window.location.href = `tel:${item.sellerPhone}`;
    };

    const handleReportItem = () => {
        alert('Report functionality is not implemented yet.');
    };

    return (
        <div className="item-details">
            <h1>{item.title}</h1>
            <img src={item.imageUrl} alt={item.title} className="item-image" />
            <p className="item-price">{`تومان ${new Intl.NumberFormat('fa-IR').format(item.price)}`}</p>
            <p className="item-city">{`City: ${item.city}`}</p>
            <p className="item-date">{`Date: ${new Date(item.date).toLocaleDateString()}`}</p>
            <div className="action-buttons">
                <button onClick={handleCallSeller} className="call-button">Call Seller</button>
                <button onClick={handleReportItem} className="report-button">Report</button>
            </div>
        </div>
    );
};

export default ItemDetails;

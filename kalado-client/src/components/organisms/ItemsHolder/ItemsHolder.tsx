import React from 'react';
import { Box } from '@mui/material';
import ItemCard from '../ItemCard/ItemCard';
import defaultImage from '../../../assets/images/default-image-url.jpg';

interface Item {
    title: string;
    imageUrl: string;
    price: number;
    city: string;
    date: string;
    itemId: string;
}

interface ItemsHolderProps {
    items: Item[];
    onItemSelect: (itemId: string) => void;
}

const ItemsHolder: React.FC<ItemsHolderProps> = ({ items, onItemSelect }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: 2,
            }}
        >
            {items.map(item => (
                <Box
                    key={item.itemId}
                    sx={{
                        flexBasis: { xs: '100%', sm: '48%', md: '30%' },
                        mb: 2,
                    }}
                >
                    <ItemCard
                        title={item.title}
                        price={`تومان ${item.price.toLocaleString()}`}
                        city={item.city}
                        date={item.date}
                        image={item.imageUrl || defaultImage}
                        onClick={() => onItemSelect(item.itemId)}
                    />
                </Box>
            ))}
        </Box>
    );
};

export default ItemsHolder;

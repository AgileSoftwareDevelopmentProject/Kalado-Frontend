import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CardMedia, CardContent, Card } from '@mui/material';

interface Item {
    title: string;
    imageUrl: string;
    price: number;
    city: string;
    date: string;
    itemId: string;
}

// Sample data for demonstration purposes
const items: Item[] = [
    {
        title: 'Samsung A54',
        imageUrl: 'https://example.com/samsung-a54.jpg',
        price: 15000000,
        city: 'تهران',
        date: 'دقایقی پیش',
        itemId: '1'
    },
    {
        title: 'Iphone 15',
        imageUrl: 'https://example.com/iphone-15.jpg',
        price: 60000000,
        city: 'شیراز',
        date: 'یک ساعت پیش',
        itemId: '2'
    },
    // Add more items as needed for testing
];

const ItemDetails: React.FC = () => {
    const { itemId } = useParams<{ itemId: string }>(); // Get the item ID from the URL
    const navigate = useNavigate();

    // Find the item based on the ID
    const item = items.find((item) => item.itemId === itemId);

    if (!item) {
        return <Typography variant="h6">Item not found</Typography>; // Handle case where item is not found
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
                Back
            </Button>
            <Card sx={{ maxWidth: 600 }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={item.imageUrl}
                    alt={item.title}
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Price: تومان {item.price.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        City: {item.city}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Date Posted: {item.date}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ItemDetails;

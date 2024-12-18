import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, CardMedia, CardContent, Card } from '@mui/material';
import mockData from '../../mockData.json';

interface Item {
    title: string;
    imageUrl: string;
    price: number;
    city: string;
    date: string;
    itemId: string;
}

const items: Item[] = mockData.Items

const ItemDetails: React.FC = () => {
    const { itemId } = useParams<{ itemId: string }>();

    const item = items.find((item) => item.itemId === itemId);

    if (!item) {
        return <Typography variant="h6">Item not found</Typography>;
    }

    return (
        <Box sx={{ padding: 2 }}>
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
                        قیمت: تومان {item.price.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        شهر: {item.city}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        تاریخ ثبت: {item.date}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ItemDetails;

import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CardMedia, CardContent, Card } from '@mui/material';
import mockData from '../../mockData.json';
import defaultImage from '../../assets/images/default-image-url.jpg';

interface Item {
    title: string;
    imageUrl: string;
    price: number;
    city: string;
    date: string;
    description: string;
    itemId: string;
}

const items: Item[] = mockData.Items;

const ItemDetails: React.FC = () => {
    const { itemId } = useParams<{ itemId: string }>();

    const item = items.find((item) => item.itemId === itemId);

    if (!item) {
        return <Typography variant="h6">Item not found</Typography>;
    }

    return (
        <Card sx={{ width: 500, height: 800 }}>
            <CardMedia
                component="img"
                // height="300"
                image={defaultImage}
                alt={item.title}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {item.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    قیمت:  {item.price.toLocaleString()} تومان
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    شهر: {item.city}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    تاریخ ثبت: {item.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    توضیحات: {item.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ItemDetails;

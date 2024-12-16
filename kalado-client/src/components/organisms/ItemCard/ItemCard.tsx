import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

interface ItemCardProps {
  title: string;
  price: string;
  city: string;
  date: string;
  image: string;
  onClick: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ title, price, city, date, image, onClick }) => {
  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'scale(1.05)' }
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography variant="h6" component="div" noWrap>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {price}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {city}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {date}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ItemCard;

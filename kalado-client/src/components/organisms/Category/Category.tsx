import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FaHome, FaCar, FaLaptop, FaGamepad, FaSuitcase, FaPlusCircle, FaUtensils } from 'react-icons/fa';

interface Category {
  title: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  { title: 'املاک', icon: <FaHome /> },
  { title: 'وسایل نقلیه', icon: <FaCar /> },
  { title: 'خانه و آشپزخانه', icon: <FaUtensils /> },
  { title: 'کالای دیجیتال', icon: <FaLaptop /> },
  { title: 'سرگرمی', icon: <FaGamepad /> },
  { title: 'لوازم شخصی', icon: <FaSuitcase /> },
  { title: '... موارد دیگر', icon: <FaPlusCircle /> },
];

const Category: React.FC = () => {

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    console.log(`${categoryTitle} clicked`);
    // Add logic to load items based on selected category
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '150px',
        right: '30px',
        width: '300px',
        textAlign: 'right',
        bgcolor: '#272C48',
        borderRadius: 2,
        boxShadow: 3,
        p: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', color: '#FFFFFF' }}>
        دسته‌بندی‌ها
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem
            component="li"
            button
            key={category.title}
            onClick={() => handleCategoryClick(category.title)}
            sx={{
              backgroundColor: selectedCategory === category.title ? '#D74101' : 'transparent',
              '&:hover': {
                backgroundColor: '#C85A01',
              },
              cursor: 'pointer',
              textAlign: 'right',
            }}
          >
            <ListItemIcon>
              {React.cloneElement(category.icon, { style: { color: '#FFFFFF' } })}
            </ListItemIcon>
            <ListItemText primary={category.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Category;

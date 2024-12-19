import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FaHome, FaCar, FaLaptop, FaGamepad, FaSuitcase, FaPlusCircle, FaUtensils } from 'react-icons/fa';

interface Category {
  title: string;
  icon: React.ReactNode;
}

interface CategoryProps {
  onSelectCategory: (categoryTitle: string) => void; // Prop to handle category selection
}

const Category: React.FC<CategoryProps> = ({ onSelectCategory }) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>('Real Estate');

  const categories: Category[] = [
    { title: t("category.one"), icon: <FaHome /> },
    { title: t("category.two"), icon: <FaCar /> },
    { title: t("category.three"), icon: <FaUtensils /> },
    { title: t("category.four"), icon: <FaLaptop /> },
    { title: t("category.five"), icon: <FaGamepad /> },
    { title: t("category.six"), icon: <FaSuitcase /> },
    { title: t("category.seven"), icon: <FaPlusCircle /> },
  ];

  const handleCategoryClick = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    onSelectCategory(categoryTitle);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '150px',
        right: '30px',
        width: '300px',
        textAlign: 'right',
        p: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', color: '#FFFFFF', fontWeight: 'bold' }}>
        {t("category.title")}
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
                backgroundColor: '#D74101',
                transform: 'translateX(-30px)',
                color: '#D74101',
              },
              cursor: 'pointer',
              textAlign: 'right',
              transition: 'transform 0.5s ease, color 0.5s ease',
            }}
          >
            <ListItemIcon>
              {React.cloneElement(category.icon as React.ReactElement<any>, { style: { color: '#FFFFFF' } })}
            </ListItemIcon>
            <ListItemText primary={category.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Category;

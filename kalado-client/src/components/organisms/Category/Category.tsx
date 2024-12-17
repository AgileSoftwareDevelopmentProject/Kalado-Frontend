import React from 'react';
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
  const handleCategoryClick = (category: string) => {
    console.log(`${category} clicked`);
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
        <ListItem button onClick={() => handleCategoryClick('املاک')}>
          <ListItemIcon>
            <FaHome style={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          <ListItemText primary="املاک" primaryTypographyProps={{ style: { color: '#FFFFFF', textAlign: 'right' } }} />
        </ListItem>
        <ListItem button onClick={() => handleCategoryClick('وسایل نقلیه')}>
          <ListItemIcon>
            <FaCar style={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          <ListItemText primary="وسایل نقلیه" primaryTypographyProps={{ style: { color: '#FFFFFF', textAlign: 'right' } }} />
        </ListItem>
        <ListItem button onClick={() => handleCategoryClick('خانه و آشپزخانه')}>
          <ListItemIcon>
            <FaUtensils style={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          <ListItemText primary="خانه و آشپزخانه" primaryTypographyProps={{ style: { color: '#FFFFFF', textAlign: 'right' } }} />
        </ListItem>
        <ListItem button onClick={() => handleCategoryClick('کالای دیجیتال')}>
          <ListItemIcon>
            <FaLaptop style={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          <ListItemText primary="کالای دیجیتال" primaryTypographyProps={{ style: { color: '#FFFFFF', textAlign: 'right' } }} />
        </ListItem>
        <ListItem button onClick={() => handleCategoryClick('سرگرمی')}>
          <ListItemIcon>
            <FaGamepad style={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          <ListItemText primary="سرگرمی" primaryTypographyProps={{ style: { color: '#FFFFFF', textAlign: 'right' } }} />
        </ListItem>
        <ListItem button onClick={() => handleCategoryClick('لوازم شخصی')}>
          <ListItemIcon>
            <FaSuitcase style={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          <ListItemText primary="لوازم شخصی" primaryTypographyProps={{ style: { color: '#FFFFFF', textAlign: 'right' } }} />
        </ListItem>
        <ListItem button onClick={() => handleCategoryClick('... موارد دیگر')}>
          <ListItemIcon>
            <FaPlusCircle style={{ color: '#FFFFFF' }} />
          </ListItemIcon>
          <ListItemText primary="... موارد دیگر" primaryTypographyProps={{ style: { color: '#FFFFFF', textAlign: 'right' } }} />
        </ListItem>
      </List>
    </Box>
  );
};

export default Category;

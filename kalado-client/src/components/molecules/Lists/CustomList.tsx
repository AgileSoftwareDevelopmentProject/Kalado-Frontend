import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Box, Typography } from '@mui/material';


const CustomList: React.FC = () => {

    const handleCategoryClick = (categoryTitle: string) => {
        console.log(`${categoryTitle} clicked`);
    };

    return (
        <Box sx={{ width: 250, bgcolor: '#272C48', borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ textAlign: 'center', color: '#FFFFFF', p: 2 }}>
                دسته‌بندی‌ها
            </Typography>
            <List>
                {categories.map((category) => (
                    <ListItem button key={category.title} onClick={() => handleCategoryClick(category.title)}>
                        <ListItemIcon sx={{ color: '#FFFFFF' }}>
                            {category.icon}
                        </ListItemIcon>
                        <ListItemText primary={category.title} primaryTypographyProps={{ style: { color: '#FFFFFF' } }} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default CustomList;

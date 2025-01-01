import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, List, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';


interface IconListProps {
    items: { title: string; icon: React.ReactNode }[];
    onSelect: (title: string) => void;
    title?: string;
}

const IconList: React.FC<IconListProps> = ({ items, onSelect, title }) => {
    const { i18n } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleCategoryClick = (categoryTitle: string) => {
        setSelectedCategory(categoryTitle);
        onSelect(categoryTitle);
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
                {title}
            </Typography>
            <List>
                {items.map((item) => (
                    <ListItemButton
                        key={item.title}
                        onClick={() => handleCategoryClick(item.title)}
                        sx={{
                            backgroundColor: selectedCategory === item.title ? '#D74101' : 'transparent',
                            '&:hover': {
                                backgroundColor: '#D74101',
                                transform: 'translateX(-30px)',
                            },
                            cursor: 'pointer',
                            textAlign: i18n.language === 'fa' ? 'right' : 'left',
                            transition: 'transform 0.5s ease, color 0.5s ease',
                        }}
                    >
                        <ListItemIcon>
                            {React.cloneElement(item.icon as React.ReactElement<any>)}
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
};

export default IconList;

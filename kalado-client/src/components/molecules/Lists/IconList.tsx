import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, List, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';


interface IconListProps {
    items: {
        value: string;
        title: string;
        icon: React.ReactNode;
    }[];
    onSelect: (title: string) => void;
    title?: string;
    initialSelect: string
}

const IconList: React.FC<IconListProps> = ({ items, onSelect, title, initialSelect }) => {
    const { i18n } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState<string>(initialSelect);

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
                        onClick={() => handleCategoryClick(item.value)}
                        sx={{
                            backgroundColor: selectedCategory === item.value ? '#D74101' : 'transparent',
                            '&:hover': {
                                color: '#D74101',
                                transform: i18n.language === 'fa' ? 'translateX(-30px)' : 'translateX(30px)',
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

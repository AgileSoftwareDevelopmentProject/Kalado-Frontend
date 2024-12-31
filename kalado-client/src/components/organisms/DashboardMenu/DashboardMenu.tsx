import React, { useState } from 'react';
import { Box, List, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';

interface DashboardMenu {
    title: string;
    icon: React.ReactNode;
}

interface DashboardMenuProps {
    categories: DashboardMenu[];
    onSelectMenu: (menuTitle: string) => void;
}

const DashboardMenu: React.FC<DashboardMenuProps> = ({ categories, onSelectMenu }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(categories[0]?.title || null);

    const handleDashboardMenuClick = (menuTitle: string) => {
        setSelectedCategory(menuTitle);
        onSelectMenu(menuTitle);
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
            <List>
                {categories.map((category) => (
                    <ListItemButton
                        key={category.title}
                        onClick={() => handleDashboardMenuClick(category.title)}
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
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
};

export default DashboardMenu;

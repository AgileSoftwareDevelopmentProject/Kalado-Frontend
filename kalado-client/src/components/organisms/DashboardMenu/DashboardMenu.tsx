import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, List, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { FaUser, FaAd, FaHistory } from 'react-icons/fa';

interface DashboardMenu {
    title: string;
    icon: React.ReactNode;
}

interface DashboardMenuProps {
    onSelectMenu: (menuTitle: string) => void;
}

const DashboardMenu: React.FC<DashboardMenuProps> = ({ onSelectMenu }) => {
    const { t } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState<string | null>('Real Estate');

    const categories: DashboardMenu[] = [
        { title: t("dashboard.user.menu.one"), icon: <FaUser /> },
        { title: t("dashboard.user.menu.two"), icon: <FaAd /> },
        { title: t("dashboard.user.menu.three"), icon: <FaHistory /> },
    ];

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

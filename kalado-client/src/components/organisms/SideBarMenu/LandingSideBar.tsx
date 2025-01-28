import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, Drawer } from '@mui/material';
import { SideBar } from '../../molecules';
import { SideBarMenu, Filter } from '../';
import MenuIcon from '@mui/icons-material/Menu';
import { OptionsComponent } from '../../../constants/options';
import { useProductContext } from '../../../contexts/ProductContext';

const LandingSideBar: React.FC = () => {
    const { t } = useTranslation();
    const { product_categories } = OptionsComponent();
    const { setSelectedCategory } = useProductContext();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleSelectCategory = (categoryValue: string) => {
        const selected = product_categories.find(cat => cat.value === categoryValue);
        if (selected) {
            setSelectedCategory({ value: selected.value, title: selected.title });
        }
    }

    return (
        <>
            {/* Hamburger Menu Icon for Mobile */}
            <IconButton
                sx={{ display: { xs: 'block', md: 'none', marginTop: '100px' } }}
                onClick={() => setDrawerOpen(true)}
            >
                <MenuIcon />
            </IconButton>

            {/* Desktop */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <SideBar>
                    <SideBarMenu
                        categories={product_categories}
                        onSelectCategory={handleSelectCategory}
                        title={t("category.title")}
                        initialSelect={product_categories[0].title}
                    />
                    <Filter />
                </SideBar>
            </Box>

            {/* Mobile */}
            <Drawer
                anchor="top"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                sx={{ zIndex: 1200, top: 200 }}
            >
                <Box sx={{ width: '100%', paddingTop: '64px' }}>
                    <SideBarMenu
                        categories={product_categories}
                        onSelectCategory={handleSelectCategory}
                        title={t("category.title")}
                        initialSelect={product_categories[0].title}
                    />
                    <Filter />
                </Box>
            </Drawer>
        </>
    );
};

export default LandingSideBar;

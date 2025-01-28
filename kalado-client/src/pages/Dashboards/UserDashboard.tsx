import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { IconList, SideBar } from '../../components/molecules';
import { ProfileManagement, AdManagement, NavBar, FormGroup } from '../../components/organisms';
import { OptionsComponent } from '../../constants/options';
import { useProductContext } from '../../contexts/ProductContext';
import { TProductResponseType } from '../../constants/apiTypes';

const UserDashboard: React.FC = () => {
    const { t } = useTranslation();
    const { user_dashboard_menu } = OptionsComponent();
    const { products } = useProductContext();
    const [selectedMenuTitle, setSelectedMenuTitle] = useState<string>(t("dashboard.user.menu.two"));
    const [selectedAd, setSelectedAd] = useState<TProductResponseType | null>(null);

    const handleSelectMenu = (menuTitle: string) => {
        setSelectedMenuTitle(menuTitle);
    };

    const handleEditAd = (adData: TProductResponseType) => {
        setSelectedAd(adData);
    };

    const handleCloseEdit = () => {
        setSelectedAd(null);
    };

    const renderContent = () => {
        switch (selectedMenuTitle) {
            case t("dashboard.user.menu.one"):
                return <ProfileManagement />;
            case t("dashboard.user.menu.two"):
                return (
                    <AdManagement
                        onEdit={handleEditAd}
                        selectedAd={selectedAd}
                        onCloseEdit={handleCloseEdit}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Box>
            <NavBar />

            <SideBar>
                <IconList
                    categories={user_dashboard_menu}
                    onSelectCategory={handleSelectMenu}
                    selectedCategory={t("dashboard.user.menu.one")}
                />
            </SideBar>

            <Box sx={{ flexGrow: 1, padding: 2 }}>
                {renderContent()}
            </Box>

            <FormGroup />
        </Box>
    );
};

export default UserDashboard;
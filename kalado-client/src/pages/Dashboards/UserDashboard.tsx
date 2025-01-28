import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { IconList, SideBar } from '../../components/molecules';
import { ProfileManagement, AdManagement, NavBar, FormGroup } from '../../components/organisms';
import { OptionsComponent } from '../../constants/options';
import { useProductContext } from '../../contexts/ProductContext';
import { getProfile } from '../../api/services/UserService';
import { TProductResponseType, TUserProfileResponse } from '../../constants/apiTypes';
import { toast } from 'react-toastify';

const UserDashboard: React.FC = () => {
    const { t } = useTranslation();
    const { user_dashboard_menu } = OptionsComponent();
    const [userData, setUserData] = useState<TUserProfileResponse | null>(null);
    const { products } = useProductContext();
    const [selectedMenuTitle, setSelectedMenuTitle] = useState<string>(t("dashboard.user.menu.one"));
    const [selectedAd, setSelectedAd] = useState<TProductResponseType | null>(null);

    const fetchUserData = async () => {
        const response = await getProfile();
        if (response.isSuccess) {
            setUserData(response.data as TUserProfileResponse);
        } else {
            toast(t('error.profile_management.retrieve_failed'));
        }
    };

    const handleSelectMenu = (menuTitle: string) => {
        setSelectedMenuTitle(menuTitle);
        if (menuTitle === t("dashboard.user.menu.one")) {
            fetchUserData();
        }
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
                return <ProfileManagement userData={userData} />;
            case t("dashboard.user.menu.two"):
                return (
                    <AdManagement
                        onEdit={handleEditAd}
                        selectedAd={selectedAd}
                        onCloseEdit={handleCloseEdit}
                    />
                );
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
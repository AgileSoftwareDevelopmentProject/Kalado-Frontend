import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { IconList, SideBar } from '../../components/molecules';
import { ProfileManagement, AdManagement, NavBar, FormGroup } from '../../components/organisms';
import { OptionsComponent } from '../../constants/options';
import { useAuth } from '../../contexts';
import { getProfile } from '../../api/services/UserService';
import { getSellersProducts } from '../../api/services/ProductService';
import { TProductResponseType, TUserProfileResponse } from '../../constants/apiTypes';
import { toast } from 'react-toastify';

const UserDashboard: React.FC = () => {
    const { t } = useTranslation();
    const { user_dashboard_menu } = OptionsComponent();
    const { token } = useAuth();
    const [userData, setUserData] = useState<TUserProfileResponse | null>(null);
    const [userProduct, setUserProduct] = useState<TProductResponseType[] | null>(null);
    const [selectedMenuTitle, setSelectedMenuTitle] = useState<string>(user_dashboard_menu[0].value);
    const [selectedAd, setSelectedAd] = useState<TProductResponseType | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // Add loading state

    const fetchUserData = async () => {
        setLoading(true); // Set loading to true before fetching
        const response = await getProfile();
        if (response.isSuccess) {
            setUserData(response.data as TUserProfileResponse);
        } else {
            toast(t('error.profile_management.retrieve_failed'));
        }
        setLoading(false); // Set loading to false after fetching
    };

    const fetchUserProducts = async () => {
        setLoading(true); // Set loading to true before fetching
        const response = await getSellersProducts(token);
        if (response.isSuccess) {
            setUserProduct(response.data as TProductResponseType[]);
        } else {
            toast(t('error.ad_management.retrieve_failed'));
        }
        setLoading(false); // Set loading to false after fetching
    };

    const handleSelectMenu = (menuTitle: string) => {
        console.log("Selected Menu:", menuTitle);
        setSelectedMenuTitle(menuTitle);
    };

    useEffect(() => {
        console.log("Selected Menu Title:", selectedMenuTitle);
        if (selectedMenuTitle === user_dashboard_menu[0].value) {
            fetchUserData();
        } else if (selectedMenuTitle === user_dashboard_menu[1].value) {
            fetchUserProducts();
        }
    }, [selectedMenuTitle]);

    const renderContent = () => {
        if (loading) return <div>Loading...</div>; // Show a loading message or spinner

        switch (selectedMenuTitle) {
            case t("dashboard.user.menu.one"):
                return <ProfileManagement userData={userData} />;
            case t("dashboard.user.menu.two"):
                return (
                    <AdManagement
                        onEdit={(adData: TProductResponseType) => setSelectedAd(adData)}
                        selectedAd={selectedAd}
                        onCloseEdit={() => setSelectedAd(null)}
                        adsList={userProduct}
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
                    selectedCategory={selectedMenuTitle}
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

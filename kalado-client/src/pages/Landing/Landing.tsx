import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { NavBar, SideBarMenu, Filter, LoginModal, SignupModal, CreateAdModal, CodeVerificationModal, ItemsHolder } from '../../components/organisms';
import { SideBar } from '../../components/molecules';
import { FaHome, FaCar, FaLaptop, FaGamepad, FaSuitcase, FaUtensils } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth, useModalContext } from '../../contexts';


const Landing: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const {
        setLoginVisible,
        setCreateAdVisible,
    } = useModalContext();

    const { token, userRole } = useAuth();

    const [selectedCategoryTitle, setSelectedCategoryTitle] = useState<string>(t("category.one"));


    const categories = [
        { titleKey: "category.one", icon: <FaHome /> },
        { titleKey: "category.two", icon: <FaCar /> },
        { titleKey: "category.three", icon: <FaUtensils /> },
        { titleKey: "category.four", icon: <FaLaptop /> },
        { titleKey: "category.five", icon: <FaGamepad /> },
        { titleKey: "category.six", icon: <FaSuitcase /> },
    ];

    const handleSelectCategory = (categoryKey: string) => {
        setSelectedCategoryTitle(t(categoryKey));
    };

    const handleOpenCreateAd = () => {
        if (!token) {
            toast.error(t("error.create_ad.disable_not_loggined"));
            return;
        }
        setCreateAdVisible(true);
    };

    const handleOpenProfilePage = () => {
        if (userRole === 'ADMIN') {
            navigate('/admin-dashboard');
        } else if (userRole === 'USER') {
            navigate('/user-dashboard');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <NavBar
                onLoginClick={() => setLoginVisible(true)}
                onCreateAdClick={handleOpenCreateAd}
                onProfileClick={handleOpenProfilePage}
            />

            <SideBar>
                <SideBarMenu
                    categories={categories.map(cat => ({
                        title: t(cat.titleKey),
                        icon: cat.icon
                    }))}
                    onSelectCategory={handleSelectCategory}
                    title={t("category.title")}
                    initialSelect={t("category.one")}
                />
                <Filter />
            </SideBar>

            <ItemsHolder
                onItemSelect={(itemId) => navigate(`/item/${itemId}`)}
                selectedCategoryTitle={selectedCategoryTitle}
            />

            <LoginModal />
            <SignupModal />
            <CreateAdModal />
            <CodeVerificationModal />
        </Box>
    );
};

export default Landing;

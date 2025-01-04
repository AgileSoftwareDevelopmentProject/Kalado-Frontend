import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { NavBar, SideBarMenu, Filter, LoginModal, SignupModal, CreateAdModal, CodeVerificationModal, ItemsHolder } from '../../components/organisms';
import { SideBar } from '../../components/molecules';
import { OptionsComponent } from '../../constants/options';


const Landing: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [selectedCategoryTitle, setSelectedCategoryTitle] = useState<string>(t("category.one"));
    const { product_categories } = OptionsComponent();

    const handleSelectCategory = (categoryKey: string) => {
        setSelectedCategoryTitle(t(categoryKey));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <NavBar />

            <SideBar>
                <SideBarMenu
                    categories={product_categories}
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

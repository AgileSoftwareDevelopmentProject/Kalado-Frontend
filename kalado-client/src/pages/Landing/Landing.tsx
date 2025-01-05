import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { SideBar } from '../../components/molecules';
import { NavBar, SideBarMenu, Filter, LoginForm, SignupForm, CodeVerificationForm, CreateAdForm, ItemsHolder } from '../../components/organisms';
import { OptionsComponent } from '../../constants/options';


const Landing: React.FC = () => {
    const { t } = useTranslation();
    const { product_categories } = OptionsComponent();
    const [selectedCategoryTitle, setSelectedCategoryTitle] = useState<string>(t("category.one"));

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
                selectedCategoryTitle={selectedCategoryTitle}
            />

            <LoginForm />
            <SignupForm />
            <CodeVerificationForm />
            <CreateAdForm />
        </Box>
    );
};

export default Landing;

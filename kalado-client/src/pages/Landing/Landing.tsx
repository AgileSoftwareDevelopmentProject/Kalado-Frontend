import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { SideBar } from '../../components/molecules';
import { NavBar, SideBarMenu, Filter, LoginForm, SignupForm, CodeVerificationForm, CreateAdForm, ItemsHolder } from '../../components/organisms';
import { OptionsComponent } from '../../constants/options';
import { ProductProvider, useProductContext } from '../../contexts';

const LandingContent: React.FC = () => {
    const { t } = useTranslation();
    const [selectedCategoryTitle, setSelectedCategoryTitle] = useState<string>(t("category.one"));

    const handleSelectCategory = (categoryKey: string) => {
        setSelectedCategoryTitle(t(categoryKey));
    };

    // Rendering products based on the selected category
    const { fetchProductsByCategory } = useProductContext();
    useEffect(() => {
        fetchProductsByCategory(selectedCategoryTitle);
    }, [selectedCategoryTitle]);

    return (
        <Box>
            <NavBar />

            <SideBar>
                <SideBarMenu
                    categories={OptionsComponent().product_categories}
                    onSelectCategory={handleSelectCategory}
                    title={t("category.title")}
                    initialSelect={t("category.one")}
                />
                <Filter />
            </SideBar>

            <ItemsHolder selectedCategoryTitle={selectedCategoryTitle} />

            <LoginForm />
            <SignupForm />
            <CodeVerificationForm />
            <CreateAdForm />
        </Box>
    );
};

const Landing: React.FC = () => (
    <ProductProvider>
        <LandingContent />
    </ProductProvider>
);

export default Landing;

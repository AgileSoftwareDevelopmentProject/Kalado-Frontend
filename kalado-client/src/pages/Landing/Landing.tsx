import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { SideBar } from '../../components/molecules';
import { NavBar, SideBarMenu, Filter, LoginForm, SignupForm, CodeVerificationForm, CreateAdForm, ItemsHolder } from '../../components/organisms';
import { OptionsComponent } from '../../constants/options';
import { useProductContext } from '../../contexts';

const Landing: React.FC = () => {
    const { t } = useTranslation();
    const { product_categories } = OptionsComponent();
    const [selectedCategory, setSelectedCategory] = useState<string>(product_categories[0].value);

    const handleSelectCategory = (categoryValue: string) => {
        setSelectedCategory(categoryValue);
    };

    // Rendering products based on the selected category
    const { fetchProductsByCategory } = useProductContext();
    useEffect(() => {
        fetchProductsByCategory(selectedCategory);
    }, [selectedCategory]);

    return (
        <Box>
            <NavBar />

            <SideBar>
                <SideBarMenu
                    categories={OptionsComponent().product_categories}
                    onSelectCategory={handleSelectCategory}
                    title={t("category.title")}
                    initialSelect={product_categories[0].value}
                />
                <Filter />
            </SideBar>

            <ItemsHolder selectedCategoryTitle={product_categories.find(cat => cat.value === selectedCategory)?.title || ''} />

            <LoginForm />
            <SignupForm />
            <CodeVerificationForm />
            <CreateAdForm />
        </Box>
    );
};

export default Landing;

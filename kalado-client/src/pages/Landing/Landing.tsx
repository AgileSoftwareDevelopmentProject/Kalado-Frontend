import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { SideBar } from '../../components/molecules';
import { NavBar, SideBarMenu, Filter, LoginForm, SignupForm, CodeVerificationForm, CreateAdForm, ItemsHolder } from '../../components/organisms';
import { OptionsComponent } from '../../constants/options';


const Landing: React.FC = () => {
    const { t } = useTranslation();
    const { product_categories } = OptionsComponent();
    const [selectedCategory, setSelectedCategory] = useState<string>(product_categories[0].value);

    return (
        <Box>
            <NavBar />

            <SideBar>
                <SideBarMenu
                    categories={OptionsComponent().product_categories}
                    onSelectCategory={(categoryValue: string) => setSelectedCategory(categoryValue)}
                    title={t("category.title")}
                    initialSelect={product_categories[0].value}
                />
                <Filter />
            </SideBar>

            <ItemsHolder selectedCategory={selectedCategory} />

            <LoginForm />
            <SignupForm />
            <CodeVerificationForm />
            <CreateAdForm />
        </Box>
    );
};

export default Landing;

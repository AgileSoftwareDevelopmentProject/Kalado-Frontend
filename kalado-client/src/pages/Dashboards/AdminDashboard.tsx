import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { IconList, SideBar } from '../../components/molecules';
import { UserManagement, ReportHistory, NavBar } from '../../components/organisms';
import { OptionsComponent } from '../../constants/options';


const AdminDashboard: React.FC = () => {
    const { t } = useTranslation();
    const { admin_dashboard_menu } = OptionsComponent();
    const [selectedMenuTitle, setSelectedMenuTitle] = useState<string>(t("dashboard.admin.menu.three"));

    const handleSelectMenu = (menuTitle: string) => {
        setSelectedMenuTitle(menuTitle);
    };

    const renderContent = () => {
        switch (selectedMenuTitle) {
            // case t("dashboard.admin.menu.two"):
            //     return <UserManagement />;
            case t("dashboard.admin.menu.three"):
                return <ReportHistory />;
        }
    };

    return (
        <Box>
            <NavBar />

            <SideBar>
                <IconList
                    categories={admin_dashboard_menu}
                    onSelectCategory={handleSelectMenu}
                    selectedCategory={""}
                />
            </SideBar>

            <Box sx={{ flexGrow: 1, padding: 2 }}>
                {renderContent()}
            </Box>

        </Box>
    );
};

export default AdminDashboard;

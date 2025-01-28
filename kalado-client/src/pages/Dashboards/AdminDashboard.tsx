import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { IconList, SideBar } from '../../components/molecules';
import { UserManagement, ReportHistory, NavBar } from '../../components/organisms';
import { OptionsComponent } from '../../constants/options';
import { getProfile } from '../../api/services/UserService';
import { TUserProfileResponse } from '../../constants/apiTypes';
import { toast } from 'react-toastify';


const AdminDashboard: React.FC = () => {
    const { t } = useTranslation();
    const { admin_dashboard_menu } = OptionsComponent();
    const [selectedMenuTitle, setSelectedMenuTitle] = useState<string>(t("dashboard.admin.menu.two"));
    const [userDataList, setUserDataList] = useState<TUserProfileResponse[] | null>(null);

    const fetchUserDataList = async () => {
        const response = await getProfile();
        if (response.isSuccess) {
            // setUserDataList(response.data as TUserProfileResponse[]);
        } else {
            toast(t('error.user_management.retrieve_failed'));
        }
    };

    const handleSelectMenu = (menuTitle: string) => {
        setSelectedMenuTitle(menuTitle);
        if (menuTitle === t("dashboard.user.menu.one")) {
            fetchUserDataList();
        }
    };

    const renderContent = () => {
        switch (selectedMenuTitle) {
            case t("dashboard.admin.menu.two"):
                return <UserManagement userDataList={userDataList} />;
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
                    selectedCategory={selectedMenuTitle}
                />
            </SideBar>

            <Box sx={{ flexGrow: 1, padding: 2 }}>
                {renderContent()}
            </Box>
        </Box>
    );
};

export default AdminDashboard;

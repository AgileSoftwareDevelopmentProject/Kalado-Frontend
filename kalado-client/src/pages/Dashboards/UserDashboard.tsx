import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { DashboardMenu, ProfileManagement, AdManagement, ReportHistory } from '../../components/organisms';
import { SideBar } from '../../components/molecules';
import mockData from '../../mockData.json';


const items = mockData.Items;

const UserDashboard = () => {
    const { t } = useTranslation();

    const [selectedMenuTitle, setSelectedMenuTitle] = useState<string | null>('مدیریت پروفایل');

    const handleSelectMenu = (menuTitle: string) => {
        setSelectedMenuTitle(menuTitle);
    };

    const renderContent = () => {
        switch (selectedMenuTitle) {
            case 'مدیریت پروفایل':
                return <ProfileManagement />;
            case '‌مدیریت آگهی‌ها':
                return <AdManagement />;
            case 'تاریخچه‌ی تخلفات':
                return <ReportHistory />;
        }
    };

    return (
        <Box>
            <SideBar>
                <DashboardMenu onSelectMenu={handleSelectMenu} />
            </SideBar>
            <Box sx={{ flexGrow: 1, padding: 2 }}>
                {renderContent()}
            </Box>
        </Box>
    );
};

export default UserDashboard;

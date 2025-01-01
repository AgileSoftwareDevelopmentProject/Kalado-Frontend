import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { Backdrop } from '../../components/atoms';
import { SideBar } from '../../components/molecules';
import { SideBarMenu, ProfileManagement, UserManagement, ReportHistory, NavBar, CreateAdForm } from '../../components/organisms';
import { FaUser, FaAd, FaHistory } from 'react-icons/fa';

interface AdminDashboardProps {
    toggleTheme: () => void;
    isDarkMode: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ toggleTheme, isDarkMode }) => {
    const { t } = useTranslation();
    const [selectedMenuTitle, setSelectedMenuTitle] = useState<string | null>(t("dashboard.admin.menu.one"));
    const [isCreateAdVisible, setCreateAdVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const adminCategories = [
        { title: t("dashboard.admin.menu.one"), icon: <FaUser /> },
        { title: t("dashboard.admin.menu.two"), icon: <FaAd /> },
        { title: t("dashboard.admin.menu.three"), icon: <FaHistory /> },
    ];


    const handleOpenCreateAd = () => {
        setCreateAdVisible(true);
    };

    const handleCloseCreateAd = () => {
        setCreateAdVisible(false);
    };

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('backdrop')) {
            handleCloseCreateAd();
        }
    };

    const handleSelectMenu = (menuTitle: string) => {
        setSelectedMenuTitle(menuTitle);
    };

    const renderContent = () => {
        switch (selectedMenuTitle) {
            case t("dashboard.admin.menu.one"):
                return <ProfileManagement />;
            case t("dashboard.admin.menu.two"):
                return <UserManagement />;
            case t("dashboard.admin.menu.three"):
                return <ReportHistory />;
        }
    };

    return (
        <Box>
            <NavBar
                onCreateAdClick={handleOpenCreateAd}
                isLoggedIn={isLoggedIn}
                toggleTheme={toggleTheme}
                isDarkMode={isDarkMode}
            />
            <SideBar>
                <SideBarMenu categories={adminCategories} onSelectCategory={handleSelectMenu} />
            </SideBar>
            <Box sx={{ flexGrow: 1, padding: 2 }}>
                {renderContent()}
            </Box>
            {isCreateAdVisible && (
                <Backdrop open={isCreateAdVisible} onClick={handleBackdropClick}>
                    <CreateAdForm onClose={handleCloseCreateAd} />
                </Backdrop>
            )}
        </Box>
    );
};

export default AdminDashboard;

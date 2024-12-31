import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { Backdrop } from '../../components/atoms';
import { SideBar } from '../../components/molecules';
import { SideBarMenu, ProfileManagement, AdManagement, ReportHistory, NavBar, CreateAdForm } from '../../components/organisms';
import { FaUser, FaAd, FaHistory } from 'react-icons/fa';

interface UserDashboardProps {
    toggleTheme: () => void;
    isDarkMode: boolean;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ toggleTheme, isDarkMode }) => {
    const { t } = useTranslation();
    const [selectedMenuTitle, setSelectedMenuTitle] = useState<string | null>(t("dashboard.user.menu.one"));
    const [isCreateAdVisible, setCreateAdVisible] = useState(false);

    const userCategories = [
        { title: t("dashboard.user.menu.one"), icon: <FaUser /> },
        { title: t("dashboard.user.menu.two"), icon: <FaAd /> },
        { title: t("dashboard.user.menu.three"), icon: <FaHistory /> },
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
            case t("dashboard.user.menu.one"):
                return <ProfileManagement />;
            case t("dashboard.user.menu.two"):
                return <AdManagement />;
            case t("dashboard.user.menu.three"):
                return <ReportHistory />;
        }
    };

    return (
        <Box>
            <NavBar
                onCreateAdClick={handleOpenCreateAd}
                isLoggedIn={true}
                toggleTheme={toggleTheme}
                isDarkMode={isDarkMode}
            />
            <SideBar>
                <SideBarMenu categories={userCategories} onSelectCategory={handleSelectMenu} />
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

export default UserDashboard;

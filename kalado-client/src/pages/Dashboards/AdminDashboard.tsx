import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { SideBar } from '../../components/molecules';
import { SideBarMenu, ProfileManagement, UserManagement, ReportHistory, NavBar, CreateAdModal } from '../../components/organisms';
import { FaUser, FaAd, FaHistory } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const AdminDashboard: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const [selectedMenuTitle, setSelectedMenuTitle] = useState<string>(t("dashboard.admin.menu.one"));
    const [isCreateAdVisible, setCreateAdVisible] = useState(false);

    const adminCategories = [
        { title: t("dashboard.admin.menu.one"), icon: <FaUser /> },
        { title: t("dashboard.admin.menu.two"), icon: <FaAd /> },
        { title: t("dashboard.admin.menu.three"), icon: <FaHistory /> },
    ];

    const handleSelectMenu = (menuTitle: string) => {
        setSelectedMenuTitle(menuTitle);
    };

    const handleLogoutClick = () => {
        setToken('');
        navigate('/');
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
                onCreateAdClick={() => setCreateAdVisible(true)}
                isInProfile={true}
                onLogoutClick={handleLogoutClick}
            />

            <SideBar>
                <SideBarMenu categories={adminCategories} onSelectCategory={handleSelectMenu} initialSelect={t("dashboard.admin.menu.one")} />
            </SideBar>

            <Box sx={{ flexGrow: 1, padding: 2 }}>
                {renderContent()}
            </Box>

            <CreateAdModal
                open={isCreateAdVisible}
                onClose={() => setCreateAdVisible(false)}
            />
        </Box>
    );
};

export default AdminDashboard;

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { CustomButton } from '../../components/atoms';
import { SideBar } from '../../components/molecules';
import { SideBarMenu, ProfileManagement, AdManagement, NavBar, CreateAdModal, ReportSubmissionModal } from '../../components/organisms';
import { FaUser, FaAd } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const UserDashboard: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const [selectedMenuTitle, setSelectedMenuTitle] = useState<string>(t("dashboard.user.menu.one"));
    const [isCreateAdVisible, setCreateAdVisible] = useState(false);
    const [isReportSubmissionVisible, setReportSubmissionVisible] = useState(false);

    const userCategories = [
        { title: t("dashboard.user.menu.one"), icon: <FaUser /> },
        { title: t("dashboard.user.menu.two"), icon: <FaAd /> },
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
            case t("dashboard.user.menu.one"):
                return <ProfileManagement />;
            case t("dashboard.user.menu.two"):
                return <AdManagement />;
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
                <SideBarMenu
                    categories={userCategories}
                    onSelectCategory={handleSelectMenu}
                    initialSelect={t("dashboard.user.menu.one")}
                />
                <CustomButton
                    text={t("item_details.report_submission_btn")}
                    onClick={() => setReportSubmissionVisible(true)}
                />
            </SideBar>

            <Box sx={{ flexGrow: 1, padding: 2 }}>
                {renderContent()}
            </Box>

            <CreateAdModal
                open={isCreateAdVisible}
                onClose={() => setCreateAdVisible(false)}
            />
            <ReportSubmissionModal
                open={isReportSubmissionVisible}
                onClose={() => setReportSubmissionVisible(false)}
            />
        </Box>
    );
};

export default UserDashboard;

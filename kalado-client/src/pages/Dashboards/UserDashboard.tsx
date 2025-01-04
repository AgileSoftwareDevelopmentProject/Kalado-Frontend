import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { CustomButton } from '../../components/atoms';
import { SideBar } from '../../components/molecules';
import { SideBarMenu, ProfileManagement, AdManagement, NavBar, CreateAdModal, ReportSubmissionModal } from '../../components/organisms';
import { useModalContext } from '../../contexts';
import { OptionsComponent } from '../../constants/options';


const UserDashboard: React.FC = () => {
    const { t } = useTranslation();
    const { user_dashboard_menu } = OptionsComponent();
    const [selectedMenuTitle, setSelectedMenuTitle] = useState<string>(t("dashboard.user.menu.one"));
    const {
        handleOpenReportSubmission,
    } = useModalContext();

    const handleSelectMenu = (menuTitle: string) => {
        setSelectedMenuTitle(menuTitle);
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
                isInProfile={true}
            />

            <SideBar>
                <SideBarMenu
                    categories={user_dashboard_menu}
                    onSelectCategory={handleSelectMenu}
                    initialSelect={t("dashboard.user.menu.one")}
                />
                <CustomButton
                    text={t("item_details.report_submission_btn")}
                    onClick={handleOpenReportSubmission}
                />
            </SideBar>

            <Box sx={{ flexGrow: 1, padding: 2 }}>
                {renderContent()}
            </Box>

            <CreateAdModal />
            <ReportSubmissionModal />
        </Box>
    );
};

export default UserDashboard;
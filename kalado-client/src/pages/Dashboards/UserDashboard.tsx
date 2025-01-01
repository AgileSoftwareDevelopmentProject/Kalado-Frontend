import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { Backdrop } from '../../components/atoms';
import { SideBar } from '../../components/molecules';
import { SideBarMenu, ProfileManagement, AdManagement, ReportHistory, NavBar, CreateAdForm } from '../../components/organisms';
import { FaUser, FaAd, FaHistory } from 'react-icons/fa';
import EditAdCard from '../../components/organisms/AdCard/EditAdCard';

interface UserDashboardProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ toggleTheme, isDarkMode }) => {
  const { t } = useTranslation();
  const [selectedMenuTitle, setSelectedMenuTitle] = useState<string | null>(t('dashboard.user.menu.one'));
  const [isCreateAdVisible, setCreateAdVisible] = useState(false);
  const [editAdData, setEditAdData] = useState<any | null>(null);
  const [ads, setAds] = useState([
    { id: 1, title: 'Ad 1', price: '100', status: 'active', category: 'Electronics', description: 'Description 1', date: '2025-01-01', images: [] },
    { id: 2, title: 'Ad 2', price: '200', status: 'reserved', category: 'Home', description: 'Description 2', date: '2025-01-02', images: [] },
  ]);

  const userCategories = [
    { title: t("dashboard.user.menu.one"), icon: <FaUser /> },
    { title: t("dashboard.user.menu.two"), icon: <FaAd /> },
    { title: t("dashboard.user.menu.thre"), icon: <FaHistory /> },
  ];

  const handleOpenCreateAd = () => setCreateAdVisible(true);
  const handleCloseCreateAd = () => setCreateAdVisible(false);

  const handleSelectMenu = (menuTitle: string) => {
    setSelectedMenuTitle(menuTitle);
    setEditAdData(null);
  };

  const handleEditAd = (adData: any) => setEditAdData(adData);

  const handleSaveAdChanges = (updatedData: any) => {
    setAds((prevAds) =>
      prevAds.map((ad) => (ad.id === updatedData.id ? { ...ad, ...updatedData } : ad))
    );
    setEditAdData(updatedData); // stay on the same page and see updates
  };

//   const renderContent = () => {
//     if (editAdData) {
//       return <EditAdCard {...editAdData} onEdit={handleSaveAdChanges} />;
//     }

//     switch (selectedMenuTitle) {
//       case t('dashboard.user.menu.one'):
//         return <ProfileManagement />;
//       case t('dashboard.user.menu.two'):
//         return <AdManagement ads={ads} onEdit={handleEditAd} />;
//       case t('dashboard.user.menu.three'):
//         return <ReportHistory />;
//       default:
//         return null;
//     }
//   };
const renderContent = () => {
    if (editAdData) {
        return <EditAdCard {...editAdData} onEdit={handleSaveAdChanges} />;
    }

    switch (selectedMenuTitle) {
        case t("dashboard.user.menu.one"):
            return <ProfileManagement />;
        case t("dashboard.user.menu.two"):
            return <AdManagement ads={ads} onEdit={handleEditAd} />;
        case t("dashboard.user.menu.three"):
            return <ReportHistory />;
        default:
            return null;
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
      <Box sx={{ flexGrow: 1, padding: 2 }}>{renderContent()}</Box>
      {isCreateAdVisible && (
        <Backdrop open={isCreateAdVisible} onClick={handleCloseCreateAd}>
          <CreateAdForm onClose={handleCloseCreateAd} />
        </Backdrop>
      )}
    </Box>
  );
};

export default UserDashboard;

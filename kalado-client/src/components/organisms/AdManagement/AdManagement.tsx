import React, { useState } from 'react';
import { Box } from '@mui/material';
import AdCard from './AdCard';
import { TProductResponseType } from '../../../constants/apiTypes';

interface AdManagementProps {
  adsList: TProductResponseType[] | null;
}

const AdManagement: React.FC<AdManagementProps> = ({ adsList }) => {
  const [ads, setAds] = useState<TProductResponseType[] | null>(adsList);


  const handleStatusChange = (id: number) => {
    // const newStatus = event.target.value;
    // try {
    //   await updateAdStatus(id, newStatus);
    //   setAds((prevAds) =>
    //     prevAds.map((ad) => (ad.id === id ? { ...ad, status: newStatus } : ad))
    //   );
    // } catch (error) {
    //   console.error('Error updating ad status:', error);
    // }
  };

  const handleDelete = (id: number) => {
    // try {
    //       await deleteAd(id);
    //       setAds((prevAds) => prevAds.filter((ad) => ad.id !== id));
    //       if (editingAdId === id) setEditingAdId(null);
    //     } catch (error) {
    //       console.error('Error deleting ad:', error);
    //     }
  };

  const handleEdit = (id: number) => {
    // const editingAd = ads.find((ad) => ad.id === id);
    // if (editingAd) {
    //   setEditingAdId(id);
    //   setPreviousAdState(editingAd);
    // }
  };


  const handleEditTitle = (id: number) => (newTitle: string) => {
    // setAds((prevAds) =>
    //   prevAds.map((ad) => (ad.id === id ? { ...ad, title: newTitle } : ad))
    // );
  };

  return (
    <Box sx={{ padding: 15 }}>
      <Box sx={{ marginBottom: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {ads && ads.map((ad) => (
            <AdCard
              key={ad.id}
              title={ad.title}
              status={ad.status}
              onStatusChange={() => handleStatusChange(ad.id)}
              onDelete={() => handleDelete(ad.id)}
              onEdit={() => handleEdit(ad.id)}
              onEditTitle={() => handleEditTitle(ad.id)}
            />
          ))}
        </Box>
      </Box>

      {/* {ads && (
        <Box sx={{ marginTop: 4 }}>
          <EditAdCard
            title={selectedAd.title}
            price={selectedAd.price.amount}
            category={selectedAd.category}
            date={selectedAd.createdAt}
            description={selectedAd.description}
            images={selectedAd.imageUrls}
            status={selectedAd.status}
            onEdit={(updatedData) => onEdit(updatedData)}
            onCancel={onCloseEdit}
          />
        </Box>
      )} */}
    </Box>
  );
};

export default AdManagement;
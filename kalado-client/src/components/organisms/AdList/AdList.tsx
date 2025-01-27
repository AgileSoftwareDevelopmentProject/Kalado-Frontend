import React, { useState, useEffect } from "react";
import resources from '../../../resource.json';
import AdCard from "../AdCard/AdCard";
import EditAdCard from "../AdCard/EditAdCard";
import { useTranslation } from "react-i18next";
import { Typography, Box } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { useAuth } from '../../../contexts';

import {
  getSellersProducts,
  deleteAd,
  updateAd,
  updateAdStatus,
} from "../../../api/services/ProductService";
import { TProductResponseType } from "../../../constants/apiTypes";

const AdList: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [ads, setAds] = useState<TProductResponseType[]>([]);
  const [editingAdId, setEditingAdId] = useState<number | null>(null);
  const [previousAdState, setPreviousAdState] = useState<TProductResponseType | null>(null);

  const language = i18n.language as "en" | "fa";
  const isRtl = language === "fa";

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const { token } = useAuth();
        // const token = localStorage.getItem("authToken");
        const data = await getSellersProducts(token);
        setAds(data);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAds();
  }, []);

  const handleStatusChange =
    (id: number) => async (event: SelectChangeEvent<string>) => {
      const newStatus = event.target.value;
      try {
        await updateAdStatus(id, newStatus);
        setAds((prevAds) =>
          prevAds.map((ad) =>
            ad.id === id ? { ...ad, status: newStatus } : ad
          )
        );
      } catch (error) {
        console.error("Error updating ad status:", error);
      }
    };

  const handleDelete = async (id: number) => {
    try {
      await deleteAd(id);
      setAds((prevAds) => prevAds.filter((ad) => ad.id !== id));
      if (editingAdId === id) setEditingAdId(null);
    } catch (error) {
      console.error("Error deleting ad:", error);
    }
  };

  const handleEditTitle = (id: number) => (newTitle: string) => {
    setAds((prevAds) =>
      prevAds.map((ad) =>
        ad.id === id ? { ...ad, title: newTitle } : ad
      )
    );
  };

  const handleEdit = (id: number) => {
    const editingAd = ads.find((ad) => ad.id === id);
    if (editingAd) {
      setEditingAdId(id);
      setPreviousAdState(editingAd); // save previous state for restoration if canceled
    }
  };

  const handleEditAdCardClose = () => {
    setEditingAdId(null);
  };

  const handleCancelEdit = () => {
    if (previousAdState) {
      setAds((prevAds) =>
        prevAds.map((ad) =>
          ad.id === previousAdState.id ? previousAdState : ad
        )
      );
    }
    handleEditAdCardClose();
  };

  const handleUpdateAd = async (id: number, updatedData: Partial<TProductResponseType>) => {
    try {
      const response = await updateAd(id, updatedData);
      if (response) {
        setAds((prevAds) =>
          prevAds.map((ad) =>
            ad.id === id ? { ...ad, ...updatedData } : ad
          )
        );
        setEditingAdId(null);
      }
    } catch (error) {
      console.error("Error updating ad:", error);
    }
  };

  const editingAd = ads.find((ad) => ad.id === editingAdId);

  return (
    <div style={{ padding: "20px", direction: isRtl ? "rtl" : "ltr" }}>
      {editingAd ? (
        <>
          <EditAdCard
            title={editingAd.title}
            price={editingAd.price.amount.toString()}
            category={editingAd.brand || resources[language]?.create_ad.input.undefined}
            productionYear={editingAd.productionYear || resources[language]?.create_ad.input.undefined}
            description={editingAd.description || ""}
            images={editingAd.imageUrls || []}
            status={editingAd.status}
            onEdit={(updatedData) => handleUpdateAd(editingAd.id, updatedData)}
            onCancel={handleCancelEdit}
          />
        </>
      ) : (
        <>
          <Box
            sx={{
              marginBottom: "50px",
              textAlign: isRtl ? "right" : "left",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              {t("ad_list.heading")}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {ads.map((ad) => (
              <AdCard
                key={ad.id}
                title={ad.title}
                status={ad.status}
                onStatusChange={handleStatusChange(ad.id)}
                onDelete={() => handleDelete(ad.id)}
                onEdit={() => handleEdit(ad.id)}
                onEditTitle={handleEditTitle(ad.id)}
              />
            ))}
          </Box>
        </>
      )}
    </div>
  );
};

export default AdList;

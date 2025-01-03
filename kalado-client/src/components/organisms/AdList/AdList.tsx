import React, { useState, useEffect } from "react";
import AdCard from "../AdCard/AdCard";
import EditAdCard from "../AdCard/EditAdCard";
import { useTranslation } from "react-i18next";
import { Typography, Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SelectChangeEvent } from "@mui/material";

const AdList = () => {
  const { t, i18n } = useTranslation();
  const [ads, setAds] = useState([
    { id: 1, title: "", status: "active" },
    { id: 2, title: "", status: "reserved" },
    { id: 3, title: "", status: "active" },
    { id: 4, title: "", status: "reserved" },
  ]);
  const [editingAdId, setEditingAdId] = useState<number | null>(null);
  const [previousAdState, setPreviousAdState] = useState<any | null>(null);

  useEffect(() => {
    setAds((prevAds) =>
      prevAds.map((ad) => ({
        ...ad,
        title: `${t("ad_list.create_ad.input.title")} ${ad.id}`,
      }))
    );
  }, [t, i18n.language]);

  const handleStatusChange =
    (id: number) => (event: SelectChangeEvent<string>) => {
      setAds((prevAds) =>
        prevAds.map((ad) =>
          ad.id === id ? { ...ad, status: event.target.value } : ad
        )
      );
    };

  const handleDelete = (id: number) => {
    setAds((prevAds) => prevAds.filter((ad) => ad.id !== id));
    if (editingAdId === id) setEditingAdId(null);
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

  const editingAd = ads.find((ad) => ad.id === editingAdId);

  return (
    <div style={{ padding: "20px", direction: "rtl" }}>
      {editingAd ? (
        <>
          <Button
            onClick={handleEditAdCardClose}
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            sx={{
              marginBottom: "20px",
              backgroundColor: "#1976d2",
              color: "#fff",
              "&:hover": { backgroundColor: "#1565c0" },
              borderRadius: "8px",
              padding: "10px 20px",
            }}
          >
            {t("ad_list.buttons.back_to_list")}
          </Button>
          <EditAdCard
            title={editingAd.title}
            price="1000"
            category="electronics"
            date="2023-01-01"
            description="Sample description"
            images={[]}
            status={editingAd.status}
            onEdit={(updatedData) => {
              handleEditTitle(editingAd.id)(updatedData.title);
            }}
            onCancel={handleCancelEdit}
          />
        </>
      ) : (
        <>
          {/* Heading for Ad List */}
          <Box sx={{ marginBottom: "50px", textAlign: "right" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#FFF",
                marginBottom: "15px",
              }}
            >
              {t("ad_list.heading")}
            </Typography>
          </Box>

          {/* List of Ad Cards */}
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

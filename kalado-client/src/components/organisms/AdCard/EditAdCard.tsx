import React, { useState, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  TextField,
  Card,
  CardMedia,
  IconButton,
  MenuItem,
  Select,
  Divider,
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import resources from '../../../resource.json';

type EditAdCardProps = {
  title: string;
  price: string;
  category: string;
  date: string;
  description: string;
  images: string[];
  status: string;
  onEdit: (data: any) => void;
  onCancel: () => void;
};

const EditAdCard: React.FC<EditAdCardProps> = ({
  title,
  price,
  category,
  date,
  description,
  images,
  status,
  onEdit,
  onCancel,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title,
    price,
    category,
    date: new Date(date),
    description,
    status,
    images,
  });
  const [language] = useState<"en" | "fa">("fa");

  const handleChange = (
    field: string,
    value: string | Date | null | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      handleChange("images", [...formData.images, ...newImages]);
    }
  };

  const handleImageDelete = (index: number) => {
    handleChange(
      "images",
      formData.images.filter((_, i) => i !== index)
    );
  };

  const handleSave = () => {
    const { title, price, category, date, description, status, images } =
      formData;
    onEdit({
      title,
      price,
      category,
      date: (date as Date).toISOString().split("T")[0],
      description,
      status,
      images,
    });
    setIsEditing(false);
  };

  const renderImages = () =>
    formData.images.map((image, index) => (
      <Box
        key={index}
        sx={{
          position: "relative",
          width: "160px",
          height: "160px",
        }}
      >
        {isEditing && (
          <IconButton
            aria-label="حذف عکس"
            onClick={() => handleImageDelete(index)}
            size="small"
            sx={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
        <CardMedia
          component="img"
          image={image}
          alt={`عکس ${index + 1}`}
          sx={{
            width: "160px",
            height: "160px",
            borderRadius: "12px",
          }}
        />
      </Box>
    ));

  const categories = resources[language]?.category;

  return (
    <Card
      sx={{
        backgroundColor: "#f9f9f9",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
        maxWidth: "900px",
        margin: "20px auto",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          {isEditing ? (
            <TextField
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              variant="outlined"
              size="small"
            />
          ) : (
            <Typography variant="h5">{formData.title}</Typography>
          )}
          <Typography
            variant="subtitle1"
            sx={{ color: "#555", marginTop: "5px" }}
          >
            {resources[language]?.ad_list?.ad_status?.[formData.status] || formData.status}
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={onCancel}>
            <CloseIcon />
          </IconButton>
          <IconButton onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? <SaveIcon onClick={handleSave} /> : <EditIcon />}
          </IconButton>
        </Box>
      </Box>

      <Divider sx={{ marginY: "20px" }} />

      <Box sx={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "15px" }}>
        <Typography>{resources[language]?.general_inputs.price}:</Typography>
        {isEditing ? (
          <TextField
            value={formData.price}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                handleChange("price", value);
              }
            }}
            fullWidth
            variant="outlined"
            size="small"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
          />
        ) : (
          <Typography>{formData.price}</Typography>
        )}

        <Typography>{resources[language]?.create_ad.input.category}:</Typography>
        {isEditing ? (
          <Select
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            fullWidth
            displayEmpty
            sx={{
              "& .MuiSelect-select": {
                paddingRight: "0px",
              },
              "& .MuiSvgIcon-root": {
                right: "0px",
              },
            }}
          >
            {Object.keys(categories || {})
              .filter((key) => key !== "title")
              .map((key) => (
                <MenuItem key={key} value={key}>
                  {categories[key as keyof typeof categories]}
                </MenuItem>
              ))}
          </Select>
        ) : (
          <Typography>
            {categories?.[formData.category as keyof typeof categories]}
          </Typography>
        )}

        <Typography>{resources[language]?.general_inputs.date}:</Typography>
        {isEditing ? (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={formData.date}
              onChange={(newDate) => handleChange("date", newDate)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        ) : (
          <Typography>{(formData.date as Date).toLocaleDateString()}</Typography>
        )}

        <Typography>{resources[language]?.general_inputs.description}:</Typography>
        {isEditing ? (
          <TextField
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
        ) : (
          <Typography>{formData.description}</Typography>
        )}
      </Box>

      <Divider sx={{ marginY: "20px" }} />

      <Typography>{resources[language]?.general_inputs.add_image}:</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {renderImages()}
        {isEditing && (
          <Box
            sx={{
              width: "160px",
              height: "160px",
              border: "2px dashed #ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            <AddIcon />
            <input
              id="image-upload"
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default EditAdCard;
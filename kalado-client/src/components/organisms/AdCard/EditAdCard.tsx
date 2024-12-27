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
  Button,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material';
import DeleteAd from './DeleteAd';

type EditAdCardProps = {
  title: string;
  price: string;
  category: string;
  date: string;
  description: string;
  images: string[];
  status: string;
  onEdit: (data: any) => void;
  onDelete: () => void;
  onEditTitle: (newTitle: string) => void;
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
  onDelete,
  onEditTitle,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedDate, setEditedDate] = useState(date);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedStatus, setEditedStatus] = useState(status);
  const [editedImages, setEditedImages] = useState<string[]>(images);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedPrice(e.target.value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedCategory(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedDate(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedDescription(e.target.value);
  };

  const handleStatusChange = (e: SelectChangeEvent<string>) => {
    setEditedStatus(e.target.value);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setEditedImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleImageDelete = (index: number) => {
    setEditedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onEditTitle(editedTitle.trim());

    const editedData = {
      title: editedTitle,
      price: editedPrice,
      category: editedCategory,
      date: editedDate,
      description: editedDescription,
      status: editedStatus,
      images: editedImages,
    };
    onEdit(editedData);
    setIsEditing(false);
  };

  return (
    <>
      <Card
        sx={{
          backgroundColor: '#f9f9f9',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
          maxWidth: '900px',
          margin: '20px auto',
          direction: 'rtl',
          border: '2px solid #e0e0e0',
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          {/* Title and Status */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {isEditing ? (
              <TextField
                value={editedTitle}
                onChange={handleTitleChange}
                variant="outlined"
                size="small"
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  backgroundColor: '#fff',
                  borderRadius: '4px',
                }}
              />
            ) : (
              <Tooltip title={title} arrow>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    color: '#333',
                    maxWidth: '300px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {title}
                </Typography>
              </Tooltip>
            )}

            {/* Status */}
            {isEditing ? (
              <Select
                value={editedStatus}
                onChange={handleStatusChange}
                displayEmpty
                IconComponent={() => null}
                sx={{
                  fontSize: '1rem',
                  backgroundColor: '#fff',
                  borderRadius: '4px',
                  width: '150px',
                }}
              >
                <MenuItem value="فعال">فعال</MenuItem>
                <MenuItem value="فروخته شده">فروخته شده</MenuItem>
                <MenuItem value="رزرو شده">رزرو شده</MenuItem>
              </Select>
            ) : (
              <Typography
                sx={{
                  fontSize: '1.1rem',
                  color: '#555',
                  backgroundColor: 'transparent',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              >
                {status}
              </Typography>
            )}
          </Box>

          {/* Edit and Delete Buttons */}
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <IconButton
              onClick={() => setIsDeleteDialogOpen(true)}
              aria-label="Delete"
              sx={{
                backgroundColor: 'transparent',
                color: '#000', // Black icon
                border: '1px solid transparent',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  borderColor: '#FF4500',
                },
                padding: '10px',
              }}
            >
              <DeleteIcon />
            </IconButton>
            {!isEditing && (
              <IconButton
                onClick={() => setIsEditing(true)}
                aria-label="Edit"
                sx={{
                  backgroundColor: 'transparent',
                  color: '#000', // Black icon
                  border: '1px solid transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderColor: '#FF4500',
                  },
                  padding: '10px',
                }}
              >
                <EditIcon />
              </IconButton>
            )}
          </Box>
        </Box>

        <Divider sx={{ marginBottom: '20px' }} />

        {/* Editable Fields */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '15px',
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555' }}>
            قیمت:
          </Typography>
          <TextField
            value={editedPrice}
            onChange={handlePriceChange}
            fullWidth
            InputProps={{
              readOnly: !isEditing,
              disableUnderline: !isEditing,
              style: {
                textAlign: 'right',
                fontSize: '1.1rem',
                backgroundColor: isEditing ? '#fff' : 'transparent',
                border: isEditing ? '1px solid #ccc' : 'none',
                borderRadius: '4px',
                padding: isEditing ? '8px' : '0px',
              },
            }}
            variant="outlined"
          />

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555' }}>
            دسته‌بندی:
          </Typography>
          <TextField
            value={editedCategory}
            onChange={handleCategoryChange}
            fullWidth
            InputProps={{
              readOnly: !isEditing,
              disableUnderline: !isEditing,
              style: {
                textAlign: 'right',
                fontSize: '1.1rem',
                backgroundColor: isEditing ? '#fff' : 'transparent',
                border: isEditing ? '1px solid #ccc' : 'none',
                borderRadius: '4px',
                padding: isEditing ? '8px' : '0px',
              },
            }}
            variant="outlined"
          />

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555' }}>
            تاریخ ثبت:
          </Typography>
          <TextField
            value={editedDate}
            onChange={handleDateChange}
            fullWidth
            InputProps={{
              readOnly: !isEditing,
              disableUnderline: !isEditing,
              style: {
                textAlign: 'right',
                fontSize: '1.1rem',
                backgroundColor: isEditing ? '#fff' : 'transparent',
                border: isEditing ? '1px solid #ccc' : 'none',
                borderRadius: '4px',
                padding: isEditing ? '8px' : '0px',
              },
            }}
            variant="outlined"
          />

          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#555' }}>
            توضیحات
          </Typography>
          <TextField
            value={editedDescription}
            onChange={handleDescriptionChange}
            fullWidth
            multiline
            rows={3}
            InputProps={{
              readOnly: !isEditing,
              disableUnderline: !isEditing,
              style: {
                textAlign: 'right',
                fontSize: '1.1rem',
                backgroundColor: isEditing ? '#fff' : 'transparent',
                border: isEditing ? '1px solid #ccc' : 'none',
                borderRadius: '4px',
                padding: isEditing ? '8px' : '0px',
              },
            }}
            variant="outlined"
          />
        </Box>

        <Divider sx={{ margin: '20px 0' }} />

        {/* Images Section */}
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#555',
          }}
        >
          عکس‌های کالا:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            marginBottom: '20px',
          }}
        >
          {editedImages.map((image, index) => (
            <Box key={index} sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                image={image}
                alt={`عکس ${index + 1}`}
                sx={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '12px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
              />
              {isEditing && (
                <IconButton
                  aria-label="Delete Image"
                  onClick={() => handleImageDelete(index)}
                  sx={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    color: '#000',
                    border: '1px solid transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                      borderColor: '#FF4500',
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}

          {isEditing && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '160px',
                height: '160px',
                borderRadius: '12px',
                border: '2px dashed #ccc',
                cursor: 'pointer',
                position: 'relative',
                '&:hover': { backgroundColor: '#f0f0f0', borderColor: '#FF4500' },
              }}
              onClick={() => document.getElementById('image-upload-input')?.click()}
            >
              <AddIcon sx={{ fontSize: '2rem', color: '#ccc' }} />
              <input
                type="file"
                id="image-upload-input"
                multiple
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
            </Box>
          )}
        </Box>

        {/* Save Button */}
        {isEditing && (
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <Button
              variant="contained"
              onClick={handleSave}
              startIcon={<SaveIcon />}
              sx={{
                fontWeight: 'bold',
                padding: '10px 20px',
                backgroundColor: '#FF4500', // Desired color
                color: '#fff',
                border: '1px solid transparent',
                '&:hover': {
                  backgroundColor: '#e03e00',
                  borderColor: '#FF4500',
                },
              }}
            >
              ذخیره
            </Button>
          </Box>
        )}
      </Card>

      {/* Delete Dialog */}
      <DeleteAd
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          onDelete();
          setIsDeleteDialogOpen(false);
        }}
      />
    </>
  );
};

export default EditAdCard;
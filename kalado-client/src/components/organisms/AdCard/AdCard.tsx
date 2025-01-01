import React, { useState } from 'react';
import {
  Card,
  Typography,
  IconButton,
  MenuItem,
  Select,
  Box,
  TextField,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import { SelectChangeEvent } from '@mui/material';
import DeleteAd from './DeleteAd';

type AdCardProps = {
  title: string;
  status: string;
  onEdit: () => void;
  onStatusChange: (event: SelectChangeEvent<string>) => void;
  onDelete: () => void;
  onEditTitle: (newTitle: string) => void;
};

const AdCard: React.FC<AdCardProps> = ({
  title,
  status,
  onEdit,
  onStatusChange,
  onDelete,
  onEditTitle,
}) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.language === 'fa'; // check if the language is right-to-left
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const MAX_TITLE_LENGTH = 50; // maximum length for the title

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= MAX_TITLE_LENGTH) {
      setNewTitle(event.target.value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      saveTitle();
    }
  };

  const saveTitle = () => {
    onEditTitle(newTitle.trim());
    setIsEditing(false);
  };

  return (
    <>
      <Card
        data-testid="ad-card-container"
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 40px',
          marginBottom: '40px',
          borderRadius: '45px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          direction: isRtl ? 'rtl' : 'ltr', // set direction based on the language
        }}
      >
       {/* Ad title */}
        <Box
          sx={{
            flex: 1,
            textAlign: isRtl ? 'right' : 'left',
          }}
        >
          {isEditing ? (
            <TextField
              fullWidth
              value={newTitle}
              onChange={handleTitleChange}
              onKeyDown={handleKeyDown}
              onBlur={saveTitle}
              autoFocus
              variant="standard"
              inputProps={{
                'aria-label': t('ad_list.inputs.title'),
              }}
              InputProps={{
                sx: {
                  '&:before': {
                    borderBottom: '1px solid #000',
                  },
                  '&:after': {
                    borderBottom: '2px solid #000',
                    width: '50%',
                    transition: 'width 0.2s ease-out',
                  },
                },
              }}
            />
          ) : (
            <Tooltip title={title} arrow>
              <Typography
                variant="h6"
                sx={{
                  color: '#000',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '300px',
                  cursor: 'default',
                }}
              >
                {title}
              </Typography>
            </Tooltip>
          )}
        </Box>

        {/* Status and Dropdown */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '85px',
            marginRight: isRtl ? 0 : '20px',
            marginLeft: isRtl ? '300px' : 0,
          }}
        >
          {/* Status Label */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ color: '#000', fontSize: '1.25rem' }}
            >
              {t('ad_list.ad_status.label')}:
            </Typography>
            <Select
              value={status}
              onChange={onStatusChange}
              displayEmpty
              sx={{
                border: 'none',
                boxShadow: 'none',
                backgroundColor: 'transparent',
                fontWeight: 'bold',
                fontSize: '1.25rem',
                '&:hover': {
                  backgroundColor: 'transparent',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '& .MuiSvgIcon-root': {
                  color: '#000',
                },
                minWidth: '250px',
                maxWidth: '300px',
                textAlign: 'center',
              }}
              inputProps={{
                'aria-label': t('ad_list.ad_status.dropdown'),
                style: { padding: 0 },
              }}
            >
              <MenuItem value="active" sx={{ fontWeight: 'bold' }}>
                {t('ad_list.ad_status.active')}
              </MenuItem>
              <MenuItem value="reserved" sx={{ fontWeight: 'bold' }}>
                {t('ad_list.ad_status.reserved')}
              </MenuItem>
              <MenuItem value="sold" sx={{ fontWeight: 'bold' }}>
                {t('ad_list.ad_status.sold')}
              </MenuItem>
            </Select>
          </Box>
        </Box>

        {/* Edit and Delete Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'flex-end',
          }}
        >
          {/* Edit Button */}
          <IconButton
            onClick={onEdit} // call the onEdit function passed as a prop
            aria-label={t('ad_list.buttons.edit')}
            sx={{
              padding: '5px',
              backgroundColor: 'transparent',
            }}
          >
            <EditIcon sx={{ color: '#000' }} />
          </IconButton>

          {/* Delete Button */}
          <IconButton
            onClick={() => setIsDeleteDialogOpen(true)}
            aria-label={t('ad_list.buttons.delete')}
            sx={{
              padding: '5px',
              backgroundColor: 'transparent',
            }}
          >
            <DeleteIcon sx={{ color: '#000' }} />
          </IconButton>
        </Box>
      </Card>

      {/* Delete Confirmation Dialog */}
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

export default AdCard;
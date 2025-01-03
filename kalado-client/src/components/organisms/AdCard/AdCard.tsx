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
  Dialog,
  DialogContent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { useTranslation } from 'react-i18next';
import { SelectChangeEvent } from '@mui/material';

type AdCardProps = {
  title: string;
  status: string;
  onStatusChange: (event: SelectChangeEvent<string>) => void;
  onDelete: () => void;
  onEditTitle: (newTitle: string) => void;
  onEdit: () => void;
};

const AdCard: React.FC<AdCardProps> = ({
  title,
  status,
  onStatusChange,
  onDelete,
  onEditTitle,
  onEdit,
}) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.language === 'fa'; // check if the language is right-to-left
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const MAX_TITLE_LENGTH = 10;

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

  const handleDeleteConfirm = () => {
    onDelete();
    setIsDeleteDialogOpen(false);
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
          borderRadius: '15px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          direction: isRtl ? 'rtl' : 'ltr',
        }}
      >
        {/* Ad Title */}
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
                  '&:before': { borderBottom: '1px solid #000' },
                  '&:after': { borderBottom: '2px solid #000', transition: 'width 0.2s ease-out' },
                },
              }}
            />
          ) : (
            <Tooltip title={title} arrow>
              <Typography
                variant="h6"
                sx={{
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

        {/* Status Dropdown */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ marginRight: '10px', color: '#000', fontSize: '1rem' }}
          >
            {t('ad_list.ad_status.label')}:
          </Typography>
          <Select
            value={status}
            onChange={onStatusChange}
            displayEmpty
            sx={{
              minWidth: '150px',
              maxWidth: '200px',
              fontSize: '1rem',
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '& .MuiSvgIcon-root': { color: '#000' },
            }}
            inputProps={{
              'aria-label': t('ad_list.ad_status.dropdown'),
            }}
          >
            <MenuItem value="active">{t('ad_list.ad_status.active')}</MenuItem>
            <MenuItem value="reserved">{t('ad_list.ad_status.reserved')}</MenuItem>
            <MenuItem value="sold">{t('ad_list.ad_status.sold')}</MenuItem>
          </Select>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'flex-end',
          }}
        >
          <IconButton
            onClick={onEdit}
            aria-label={t('ad_list.buttons.edit')}
          >
            <EditIcon/>
          </IconButton>
          <IconButton
            onClick={() => setIsDeleteDialogOpen(true)}
            aria-label={t('ad_list.buttons.delete')}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: '20px',
            padding: '20px',
          },
        }}
      >
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <Typography
            variant="h6"
            sx={{ textAlign: 'center' }}
          >
            {t('ad_list.delete_confirmation.title')}
          </Typography>
          <Box sx={{ display: 'flex', gap: '30px' }}>
          <IconButton
              onClick={handleDeleteConfirm}
              sx={{
                backgroundColor: 'green',
                color: '#fff',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                '&:hover': { backgroundColor: '#66bb66' },
              }}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              onClick={() => setIsDeleteDialogOpen(false)}
              sx={{
                backgroundColor: 'red',
                color: '#fff',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                '&:hover': { backgroundColor: '#ff4d4d' },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdCard;

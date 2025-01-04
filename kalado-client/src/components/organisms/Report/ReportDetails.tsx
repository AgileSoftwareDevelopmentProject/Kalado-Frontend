import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  useTheme,
} from '@mui/material';
import { Download as DownloadIcon, Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// وارد کردن تصاویر
import pishi1 from '../../../assets/images/pishi1.jpg';
import pishi4 from '../../../assets/images/pishi4.jpg';

const ReportDetails = ({ report, onBackToList, onBlockContent }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';
  const theme = useTheme();
  const [openImage, setOpenImage] = useState(null);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false); // مدیریت دیالوگ تایید مسدود کردن

  // اضافه کردن تصاویر به لیست داده‌ها
  const evidenceImages = [pishi1, pishi4];

  const handleOpenImage = (image) => {
    setOpenImage(image);
  };

  const handleCloseImage = () => {
    setOpenImage(null);
  };

  const handleBlockConfirm = () => {
    onBlockContent(report.reportedContentId);
    setIsBlockDialogOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          width: '40vw',
          height: '40vh',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 4,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '15px',
          direction: isRtl ? 'rtl' : 'ltr',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: 4,
            fontWeight: 'bold',
          }}
        >
          {t('report.report_card.violation_type')}: {t(`report.category.${report.violationType}`)}
        </Typography>

        <Grid container sx={{ flex: 1 }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              paddingRight: isRtl ? 2 : 0,
              paddingLeft: isRtl ? 0 : 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
              }}
            >
              {t('report.report_card.description')}:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'justify',
              }}
            >
              {report.description}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              borderLeft: isRtl ? 'none' : `1px solid ${theme.palette.divider}`,
              borderRight: isRtl ? `1px solid ${theme.palette.divider}` : 'none',
              paddingRight: isRtl ? 2 : 0,
              paddingLeft: isRtl ? 0 : 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
                textAlign: 'right',
                width: '100%',
              }}
            >
              {t('report.choose_evidence')}:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
              {evidenceImages.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    display: 'inline-block',
                    textAlign: 'center',
                  }}
                >
                  <img
                    src={image}
                    alt={`${t('report.report_card.evidence')} ${index + 1}`}
                    style={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: `1px solid ${theme.palette.divider}`,
                      cursor: 'pointer',
                    }}
                    onClick={() => handleOpenImage(image)}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                      boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
                    }}
                    onClick={() => window.open(image, '_blank')}
                  >
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: 'flex',
            flexDirection: isRtl ? 'row-reverse' : 'row',
            justifyContent: isRtl ? 'flex-start' : 'flex-end',
            gap: 2,
            marginTop: 4,
          }}
        >
          <Button
            variant="contained"
            onClick={() => setIsBlockDialogOpen(true)} // باز کردن دیالوگ تایید
            sx={{
              textTransform: 'none',
            }}
          >
            {t('report.report_card.actions.block')}
          </Button>
          <Button
            variant="outlined"
            onClick={onBackToList}
            sx={{
              textTransform: 'none',
            }}
          >
            {t('report.report_card.actions.back_to_list')}
          </Button>
        </Box>

        <Dialog open={!!openImage} onClose={handleCloseImage}>
          <img
            src={openImage}
            alt={t('report.report_card.evidence')}
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '90vw',
              maxHeight: '90vh',
            }}
          />
        </Dialog>
      </Box>

      {/* دیالوگ تایید مسدود کردن */}
      <Dialog
        open={isBlockDialogOpen}
        onClose={() => setIsBlockDialogOpen(false)}
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
            sx={{ textAlign: 'center', fontWeight: 'bold' }}
          >
            {t('report.report_card.block_confirmation.title')}
          </Typography>
          <Box sx={{ display: 'flex', gap: '30px' }}>
            <IconButton
              onClick={handleBlockConfirm}
              sx={{
                backgroundColor: 'green',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                '&:hover': { backgroundColor: '#66bb66' },
              }}
              aria-label={t('dialog.confirm')}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              onClick={() => setIsBlockDialogOpen(false)}
              sx={{
                backgroundColor: 'red',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                '&:hover': { backgroundColor: '#ff4d4d' },
              }}
              aria-label={t('dialog.cancel')}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReportDetails;

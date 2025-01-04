import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Card,
} from '@mui/material';
import { Download as DownloadIcon, Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import CustomToast from '../../molecules/CustomToast/CustomToast';

import pishi1 from '../../../assets/images/pishi1.jpg';
import pishi4 from '../../../assets/images/pishi4.jpg';

type Report = {
  violationType: string;
  description: string;
  reportedContentId: string;
};

type ReportDetailsProps = {
  report: Report;
  onBackToList: () => void;
  onBlockContent: (contentId: string) => void;
};

const ReportDetails: React.FC<ReportDetailsProps> = ({ report, onBackToList, onBlockContent }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';
  const [openImage, setOpenImage] = useState<string | null>(null);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);

  const evidenceImages = [pishi1, pishi4];

  const handleOpenImage = (image: string) => {
    setOpenImage(image);
  };

  const handleCloseImage = () => {
    setOpenImage(null);
  };

  const handleBlockConfirm = () => {
    if (report) {
      onBlockContent(report.reportedContentId);

      // Display success toast
      toast.success(t('report.report_card.block_success_message'), {
        position: isRtl ? 'bottom-right' : 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    setIsBlockDialogOpen(false);
  };

  return (
    <>
      <CustomToast />
      <Card
        sx={{
          width: '40vw',
          height: 'auto',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 4,
          boxShadow: 2,
          borderRadius: 2,
          direction: isRtl ? 'rtl' : 'ltr',
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
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              {t('report.report_card.description')}:
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'justify' }}>
              {report.description}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              borderLeft: isRtl ? 'none' : `1px solid`,
              borderRight: isRtl ? `1px solid` : 'none',
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
                      borderRadius: 8,
                      border: `1px solid`,
                      cursor: 'pointer',
                    }}
                    onClick={() => handleOpenImage(image)}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
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
            onClick={() => setIsBlockDialogOpen(true)}
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
      </Card>

      <Dialog
        open={isBlockDialogOpen}
        onClose={() => setIsBlockDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            padding: 2,
          },
        }}
      >
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            {t('report.report_card.block_confirmation.title')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <IconButton
              onClick={handleBlockConfirm}
              sx={{
                backgroundColor: 'green',
                width: 48,
                height: 48,
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
                width: 48,
                height: 48,
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

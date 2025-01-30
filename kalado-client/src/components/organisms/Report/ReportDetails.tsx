import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Dialog, IconButton, Card } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { CustomButton } from '../../atoms';
import { ConfirmationDialog } from '../../../components/molecules';
import { ItemDetailsPopup } from '../../organisms';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateReportStatus } from '../../../api/services/ReportService';
import { ReportStatusUpdateData, TReportResponseType } from '../../../constants/apiTypes';
import { useModalContext, useProductContext } from '../../../contexts';

interface ReportDetailsProps {
  report: TReportResponseType;
}

const ReportDetails: React.FC<ReportDetailsProps> = ({ report }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';
  const [openImage, setOpenImage] = useState<string | null>(null);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
  const [isBlockAdDialogOpen, setIsBlockAdDialogOpen] = useState(false);
  const { handleProductDetailsClick } = useModalContext();
  const { singleProduct, loading, error, fetchSingleProduct } = useProductContext();

  useEffect(() => {
    if (!report.reportedContentId) return;
    fetchSingleProduct(Number(report.reportedContentId));
  }, [report.reportedContentId]);

  const handleOpenImage = (image: string) => {
    setOpenImage(image);
  };

  const handleCloseImage = () => {
    setOpenImage(null);
  };

  const handleBlockUserConfirm = async () => {
    const blockUserData: ReportStatusUpdateData = {
      status: report.status,
      adminNotes: "This user has been blocked.",
      blockUser: true,
      blockReason: null,
      blockProduct: false,
    };
    const response = await updateReportStatus(report.id, blockUserData);
    if (response.isSuccess) {
      toast(t('report.report_card.block_usr_success_message'));
    } else {
      toast(t('error.report_history.block_user_failed'));
    }
  };

  const handleBlockAdConfirm = async () => {
    const blockAdData: ReportStatusUpdateData = {
      status: report.status,
      adminNotes: "This user has been blocked.",
      blockUser: false,
      blockReason: null,
      blockProduct: true
    };
    const response = await updateReportStatus(report.id, blockAdData);
    if (response.isSuccess) {
      toast(t('report.report_card.block_ad_success_message'));
    } else {
      toast(t('error.report_history.block_ad_failed'));
    }
  };

  return (
    <>
      <Card
        sx={{
          width: '80vw',
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
              borderLeft: isRtl ? 'none' : '1px solid',
              borderRight: isRtl ? '1px solid' : 'none',
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
              {report.evidenceFiles.map((image, index) => (
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
                      border: '1px solid',
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

        <Box sx={{ display: 'flex', flexDirection: isRtl ? 'row-reverse' : 'row', justifyContent: 'space-between', gap: 2, marginTop: 4 }}>

          <CustomButton text={t('report.report_card.actions.go_to_ad')} onClick={handleProductDetailsClick} fullWidth={true} />
          <CustomButton text={t('report.report_card.actions.block_ad')} onClick={() => setIsBlockAdDialogOpen(true)} fullWidth={true} />
          <CustomButton text={t('report.report_card.actions.block_user')} onClick={() => setIsBlockDialogOpen(true)} fullWidth={true} />

          {/* <Box sx={{ display: 'flex', gap: 2 }}>
            
          </Box> */}

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

      <ConfirmationDialog
        isDialogOpen={isBlockDialogOpen}
        onClose={() => setIsBlockDialogOpen(false)}
        onCheck={() => handleBlockUserConfirm()}
        message={t('report.report_card.block_confirmation.title_usr')}
      />

      <ConfirmationDialog
        isDialogOpen={isBlockAdDialogOpen}
        onClose={() => setIsBlockAdDialogOpen(false)}
        onCheck={() => handleBlockAdConfirm()}
        message={t('report.report_card.block_confirmation.title_ad')}
      />

      {singleProduct && <ItemDetailsPopup singleProduct={singleProduct} />}
    </>
  );
};

export default ReportDetails;

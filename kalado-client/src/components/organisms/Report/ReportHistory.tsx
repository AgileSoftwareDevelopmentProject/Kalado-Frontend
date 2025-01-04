import React, { useState } from 'react';
import { Box, Typography, Grid, Card, Button } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTranslation } from 'react-i18next';
import ReportDetails from './ReportDetails';

const mockedReports = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  violationType: index % 3 === 0 ? 'one' : index % 3 === 1 ? 'two' : 'three',
  description: `من گربه دختر سفارش داده بودم پسر اوردن`,
  reportUserId: `user_${index + 1}`,
  reportedContentId: `content_${index + 1}`,
  submissionDate: new Date().toLocaleDateString(),
}));

const ReportHistory: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const handleShowDetails = (report: any) => {
    setSelectedReport(report);
  };

  const handleBackToList = () => {
    setSelectedReport(null);
  };

  const handleBlockContent = (contentId: string) => {
    console.log(`${t('report.report_card.actions.block')} ${contentId}`);
  };

  return (
    <Box
      sx={{
        padding: 20,
        maxWidth: '50vw',
        margin: '0 auto',
        direction: isRtl ? 'rtl' : 'ltr',
        textAlign: isRtl ? 'right' : 'left',
      }}
    >
      {!selectedReport ? (
        <>
          <Typography
            variant="h4"
            sx={{
              marginBottom: 4,
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {t('report.report_card.history_title')}
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {mockedReports.map((report) => (
              <Grid item xs={12} sm={6} key={report.id}>
                <Card
                  sx={{
                    padding: 2,
                    boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
                    borderRadius: '15px',
                    margin: '0 auto',
                  }}
                >
                  <Typography variant="h6" sx={{ marginBottom: 1 }}>
                    {t('report.report_card.violation_type')}: {t(`report.category.${report.violationType}`)}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 1 }}>
                    {t('report.report_card.reporter_id')}: {report.reportUserId}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 1 }}>
                    {t('report.report_card.content_id')}: {report.reportedContentId}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 1 }}>
                    {t('general_inputs.date')}: {report.submissionDate}
                  </Typography>
                  <Button
                    variant="text"
                    onClick={() => handleShowDetails(report)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: 2,
                      textTransform: 'none',
                      justifyContent: isRtl ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <InfoOutlinedIcon sx={{ marginRight: isRtl ? 0 : 1, marginLeft: isRtl ? 1 : 0 }} />
                    {t('report.report_card.actions.show_details')}
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <ReportDetails
          report={selectedReport}
          onBackToList={handleBackToList}
          onBlockContent={handleBlockContent}
        />
      )}
    </Box>
  );
};

export default ReportHistory;

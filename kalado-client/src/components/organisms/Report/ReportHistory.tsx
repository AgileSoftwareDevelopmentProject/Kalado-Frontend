import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, Button } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTranslation } from 'react-i18next';
import ReportDetails from './ReportDetails';
import pishi1 from '../../../assets/images/pishi1.jpg';
import pishi4 from '../../../assets/images/pishi4.jpg';

export type Report = {
  id: number;
  violationType: string;
  description: string;
  evidenceImages: string[];
  reportedContentId: string;
  reportUserId: string;
  submissionDate: string;
};

// mocked reports
const mockedReports: Report[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  violationType: index % 3 === 0 ? 'one' : index % 3 === 1 ? 'two' : 'three',
  description: `من گربه دختر سفارش داده بودم پسر اوردن`,
  evidenceImages: [
    pishi1,
    pishi4,
  ],
  reportedContentId: `content_id_${index + 1}`,
  reportUserId: `user_${index + 1}`,
  submissionDate: new Date().toISOString(),
}));

const ReportHistory: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    // simulate API call
    const fetchReports = async () => {
      // replace this with an actual API call
      const apiReports: Report[] = []; // fetch data from API
      setReports(apiReports.length > 0 ? apiReports : mockedReports);
    };

    fetchReports();
  }, []);

  const handleShowDetails = (report: Report) => {
    setSelectedReport(report);
  };

  const handleBackToList = () => {
    setSelectedReport(null);
  };

  const handleBlockContent = (contentId: string) => {
    console.log(`Blocked content: ${contentId}`);
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
            {reports.map((report) => (
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
                    {t('report.report_card.violation_type')}: {report.violationType}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 1 }}>
                    {t('report.report_card.reporter_id')}: {report.reportUserId}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 1 }}>
                    {t('report.report_card.content_id')}: {report.reportedContentId}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 1 }}>
                    {t('general_inputs.date')}: {new Date(report.submissionDate).toLocaleDateString()}
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

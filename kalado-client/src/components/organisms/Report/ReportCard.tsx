import React from 'react';
import { Grid, Card, Typography, Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

type ReportCardProps = {
  violationType: string;
  description: string;
  reportUserId: string;
  reportedContentId: string;
  submissionDate: string; // Added submissionDate
  evidenceImages: string[]; // Added evidenceImages
};

const ReportCard: React.FC<ReportCardProps> = ({
  violationType,
  description,
  reportUserId,
  reportedContentId,
  submissionDate,
  evidenceImages,
}) => {
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        padding: 2,
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        marginBottom: 2,
        maxWidth: '100%',
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          {t('report.report_card.violation_type')}: {violationType}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          {t('report.report_card.reporter_id\n')}: {reportUserId}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          {t('report.report_card.content_id')}: {reportedContentId}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          {t('general_inputs.date')}: {new Date(submissionDate).toLocaleDateString()}
        </Typography>

        {/* Evidence Images */}
        {evidenceImages.length > 0 && (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              {t('report.choose_evidence')}:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {evidenceImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${t('report.choose_evidence')} ${index + 1}`}
                  style={{
                    width: '20px',
                    height: '10px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    border: '1px solid #ccc',
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* More Details Button */}
        <Box sx={{ marginTop: 2, textAlign: 'right' }}>
          <Button variant="outlined" size="small">
            {t('item_details.report_submission_btn')} {/* Or 'More Details' */}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

const ReportList: React.FC = () => {
  const mockReports = [
    {
      violationType: 'Abusiveness',
      description: 'This user was abusive in comments.',
      reportUserId: 'user1@example.com',
      reportedContentId: 'content123',
      submissionDate: '2023-01-01T12:00:00Z',
      evidenceImages: ['https://via.placeholder.com/80', 'https://via.placeholder.com/80'],
    },
    {
      violationType: 'Inappropriate Content',
      description: 'This post contains offensive material.',
      reportUserId: 'user2@example.com',
      reportedContentId: 'content456',
      submissionDate: '2023-01-02T12:00:00Z',
      evidenceImages: ['https://via.placeholder.com/80'],
    },
  ];

  return (
    <Grid container spacing={2}>
      {mockReports.map((report, index) => (
        <Grid item xs={12} sm={6} key={index}>
          {/* تغییر به دو ستون */}
          <ReportCard
            violationType={report.violationType}
            description={report.description}
            reportUserId={report.reportUserId}
            reportedContentId={report.reportedContentId}
            submissionDate={report.submissionDate}
            evidenceImages={report.evidenceImages}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ReportList;

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box, Typography, CardMedia, CardContent, Card } from '@mui/material';
import { CustomButton, Backdrop } from '../../components/atoms';
import { ReportSubmissionForm } from '../../components/organisms';
import mockData from '../../mockData.json';
import defaultImage from '../../assets/images/default-image-url.jpg';
import PriceIcon from '@mui/icons-material/AttachMoney';
import CityIcon from '@mui/icons-material/LocationOn';
import DateIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';

interface Item {
    title: string;
    imageUrl: string;
    price: number;
    city: string;
    date: string;
    description: string;
    itemId: string;
}

const items: Item[] = mockData.Items;

const ItemDetails: React.FC = () => {
    const { t } = useTranslation();
    const [isReportSubmissionVisible, setReportSubmissionVisible] = useState(false);

    const handleOpenReportSubmission = () => setReportSubmissionVisible(true);
    const handleCloseReportSubmission = () => setReportSubmissionVisible(false);

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('backdrop')) {
            handleCloseReportSubmission();
        }
    };

    const { itemId } = useParams<{ itemId: string }>();
    const item = items.find((item) => item.itemId === itemId);

    if (!item) {
        return <Typography variant="h6">Item not found</Typography>;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: 'transparent',
                p: 2,
            }}
        >
            <Card sx={{ width: 800, height: 'auto', bgcolor: "#272C48" }}>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <CardContent>
                            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                                {item.title}
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <PriceIcon />
                                <Typography variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                                    {item.price.toLocaleString()} تومان
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <CityIcon />
                                <Typography variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                                    {item.city}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <DateIcon />
                                <Typography variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                                    {item.date}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <DescriptionIcon />
                                <Typography variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                                    {item.description}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Box>
                    <CardMedia
                        component="img"
                        image={defaultImage}
                        alt={item.title}
                        sx={{ height: 400, width: 500, objectFit: 'cover' }}
                    />
                </Box>
                <CustomButton
                    text={t("item_details.report_submission_btn")}
                    onClick={handleOpenReportSubmission}
                />
            </Card>
            {isReportSubmissionVisible && (
                <Backdrop open={isReportSubmissionVisible} onClick={handleBackdropClick}>
                    <ReportSubmissionForm onClose={handleCloseReportSubmission} />
                </Backdrop>
            )}
        </Box>
    );
};

export default ItemDetails;

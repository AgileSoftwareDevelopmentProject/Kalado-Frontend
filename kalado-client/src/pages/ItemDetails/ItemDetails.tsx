import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box, Typography, CardMedia, CardContent, Card } from '@mui/material';
import { CustomButton, Backdrop } from '../../components/atoms';
import { ReportSubmissionForm } from '../../components/organisms';
import mockData from '../../mockData.json';
import defaultImage from '../../assets/images/default-image-url.jpg';

// Import your icons
import PriceIcon from '@mui/icons-material/AttachMoney'; // Example icon for price
import CityIcon from '@mui/icons-material/LocationOn'; // Example icon for city
import DateIcon from '@mui/icons-material/CalendarToday'; // Example icon for date
import DescriptionIcon from '@mui/icons-material/Description'; // Example icon for description

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
                bgcolor: 'transparent', // Set background to transparent
                p: 2,
            }}
        >
            <Card sx={{ width: 600, height: 'auto', bgcolor: "rgba(255, 255, 255, 0.8)" }}> {/* Semi-transparent white background */}
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <CardContent>
                            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}> {/* Increased font size */}
                                {item.title}
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <PriceIcon />
                                <Typography variant="h6" color="text.secondary" sx={{ ml: 1 }}> {/* Increased font size */}
                                    {t("item_details.price")}: {item.price.toLocaleString()} تومان
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <CityIcon />
                                <Typography variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                                    {t("item_details.city")}: {item.city}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <DateIcon />
                                <Typography variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                                    {t("item_details.date")}: {item.date}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <DescriptionIcon />
                                <Typography variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                                    {t("item_details.description")}: {item.description}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Box>
                    <CardMedia
                        component="img"
                        image={defaultImage}
                        alt={item.title}
                        sx={{ height: 400, width: '250px', objectFit: 'cover' }} // Increased height for the image and fixed width
                    />
                </Box>
                <CustomButton
                    text="ثبت تخلف"
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

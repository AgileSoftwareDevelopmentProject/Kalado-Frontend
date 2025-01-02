import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box, Typography, CardMedia, CardContent, Card, Select, MenuItem } from '@mui/material';
import { CustomButton } from '../../components/atoms';
import { ReportSubmissionModal } from '../../components/organisms';
import mockData from '../../mockData.json';
import defaultImage from '../../assets/images/no-image.png';
import PriceIcon from '@mui/icons-material/AttachMoney';
import CityIcon from '@mui/icons-material/LocationOn';
import DateIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import PhoneIcon from '@mui/icons-material/Phone';

interface Item {
    title: string;
    imageUrl: string;
    price: number;
    city: string;
    date: string;
    description: string;
    itemId: string;
    seller_phone: string;
}

const items: Item[] = mockData.Items;

const ItemDetails: React.FC = () => {
    const { t } = useTranslation();
    const [isReportSubmissionVisible, setReportSubmissionVisible] = useState(false);
    const { itemId } = useParams<{ itemId: string }>();
    const item = items.find((item) => item.itemId === itemId);


    const copyToClipboard = (phoneNumber: string) => {
        navigator.clipboard.writeText(phoneNumber)
            .then(() => {
                alert(`Phone number ${phoneNumber} copied to clipboard!`);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

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
                p: 2,
            }}
        >
            <Card sx={{ width: 800, height: 'auto' }}>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <CardContent>
                            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 3 }}>
                                {item.title}
                            </Typography>
                            <Box display="flex" alignItems="center" sx={{ ml: 1, mb: 2 }}>
                                <PriceIcon sx={{ ml: 2 }} />
                                <Typography variant="h6">
                                    {item.price.toLocaleString()} {t("currency")}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" sx={{ ml: 1, mb: 2 }}>
                                <CityIcon sx={{ ml: 2 }} />
                                <Typography variant="h6">
                                    {item.city}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" sx={{ ml: 1, mb: 2 }}>
                                <DateIcon sx={{ ml: 2 }} />
                                <Typography variant="h6">
                                    {item.date}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" sx={{ ml: 1, mb: 2 }}>
                                <DescriptionIcon sx={{ ml: 2 }} />
                                <Typography variant="h6">
                                    {item.description}
                                </Typography>
                            </Box>

                            <Box display="flex" alignItems="center" sx={{ ml: 1, mb: 2 }}>
                                <PhoneIcon sx={{ ml: 2 }} />
                                <Typography
                                    variant="h6"
                                    onClick={() => copyToClipboard(item.seller_phone)}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': {
                                            color: 'primary.main',
                                        },
                                    }}
                                >
                                    {item.seller_phone}
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
                </Box >
                <CustomButton
                    text={t("item_details.report_submission_btn")}
                    onClick={() => setReportSubmissionVisible(true)}
                />
            </Card >

            <ReportSubmissionModal
                open={isReportSubmissionVisible}
                onClose={() => setReportSubmissionVisible(false)}
            />
        </Box >
    );
};

export default ItemDetails;

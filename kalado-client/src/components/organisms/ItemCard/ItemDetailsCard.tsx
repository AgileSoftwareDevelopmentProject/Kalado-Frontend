import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import defaultImage from '../../../assets/images/no-image.png';
import { CustomButton } from '../../../components/atoms';
import PriceIcon from '@mui/icons-material/AttachMoney';
import CityIcon from '@mui/icons-material/LocationOn';
import DateIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import PhoneIcon from '@mui/icons-material/Phone';
import { toast } from 'react-toastify';
import { useModalContext } from '../../../contexts';

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

interface ItemDetailsCardProps {
    item: Item;
}

const ItemDetailsCard: React.FC<ItemDetailsCardProps> = ({ item }) => {
    const { t } = useTranslation();

    const {
        handleOpenReportSubmission,
    } = useModalContext();

    const copyToClipboard = (phoneNumber: string) => {
        navigator.clipboard.writeText(phoneNumber)
            .then(() => {
                toast(t("success.copy_phone_number"));
            })
            .catch(err => {
                toast(t('error.item_details.copy_phone_number_failed'));
            });
    };

    return (
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
                    image={item.imageUrl || defaultImage}
                    alt={item.title}
                    sx={{ height: 400, width: 500, objectFit: 'cover' }}
                />
            </Box >
            <CustomButton
                text={t("item_details.report_submission_btn")}
                onClick={handleOpenReportSubmission}
            />
        </Card >
    );
};

export default ItemDetailsCard;

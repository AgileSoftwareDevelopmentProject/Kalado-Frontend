import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import defaultImage from '../../../assets/images/no-image.png';
import { CustomButton } from '../../../components/atoms';
import PriceIcon from '@mui/icons-material/AttachMoney';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DateIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import PhoneIcon from '@mui/icons-material/Phone';
import { useModalContext } from '../../../contexts';
import { toast } from 'react-toastify';


interface ItemDetailsCardProps {
    item: {
        title: string | null;
        price: {
            amount: number | null;
            unit: string | null;
        };
        createdAt: string | null;
        imageUrls?: string[];
        description?: string | null;
        id: number;
        sellerId: number | null;
        brand: string | null;
        productionYear: string | null;
    };
    neededReportSubmissionForm?: boolean;
}

const ItemDetailsCard: React.FC<ItemDetailsCardProps> = ({ item, neededReportSubmissionForm = false }) => {
    const { t } = useTranslation();
    const { handleOpenReportSubmission } = useModalContext();

    const imageToDisplay = item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : defaultImage;

    const formatDate = (timestamp: string | null): string => {
        if (!timestamp) return t("item_details.no_date");
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    };

    const copyPhoneNumberToClipboard = () => {
        if (item.sellerId) {
            navigator.clipboard.writeText(item.sellerId.toString())
                .then(() => {
                    toast(t("item_details.phone_copied"));
                })
                .catch(err => {
                    toast(t("error.item_details.copy_phone_number_failed"));
                });
        }
    };

    return (
        <Card sx={{ width: 800, height: 'auto' }}>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <CardContent>
                        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 3 }}>
                            {item.title || t("item_details.no_title")}
                        </Typography>
                        <Box display="flex" alignItems="center" sx={{ ml: 1, mb: 2 }}>
                            <PriceIcon sx={{ ml: 2 }} />
                            <Typography variant="h6">
                                {`${item.price?.amount?.toLocaleString() || 0} ${t("currency")}`}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ ml: 1, mb: 2 }}>
                            <LocalOfferIcon sx={{ ml: 2 }} />
                            <Typography variant="h6">
                                {item.brand || t("item_details.no_brand")}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ ml: 1, mb: 2 }}>
                            <DateIcon sx={{ ml: 2 }} />
                            <Typography variant="h6">
                                {formatDate(item.createdAt)}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ ml: 1, mb: 2 }}>
                            <DescriptionIcon sx={{ ml: 2 }} />
                            <Typography variant="h6">
                                {item.description || t("item_details.no_description")}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ ml: 1, mb: 2 }}>
                            <PhoneIcon sx={{ ml: 2 }} />
                            <Typography
                                variant="h6"
                                onClick={copyPhoneNumberToClipboard}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: 'primary.main',
                                    },
                                }}
                            >
                                {item.sellerId || t("item_details.no_seller_phone")}
                            </Typography>
                        </Box>
                    </CardContent>
                </Box>
                <CardMedia
                    component="img"
                    image={imageToDisplay}
                    alt={item.title || 'Item Image'}
                    sx={{ height: 400, width: 500, objectFit: 'cover' }}
                />
            </Box >
            {
                neededReportSubmissionForm && (
                    <CustomButton
                        text={t("item_details.report_submission_btn")}
                        onClick={handleOpenReportSubmission}
                    />)
            }
        </Card >
    );
};

export default ItemDetailsCard;

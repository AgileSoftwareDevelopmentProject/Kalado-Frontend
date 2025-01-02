import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { ReportSubmissionModal, ItemDetailsCard } from '../../components/organisms';
import { getSingleProduct } from '../../services/getSingleProductService';

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

const ItemDetails: React.FC = () => {
    const { t } = useTranslation();
    const { itemId } = useParams<{ itemId: string }>();
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [isReportSubmissionVisible, setReportSubmissionVisible] = useState(false);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                setLoading(true);
                const fetchedItem = await getSingleProduct(itemId!);
                setItem(fetchedItem);
            } catch (err) {
                setError(t("error.general"));
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [itemId, t]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!item || error) {
        return (<Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                p: 2,
            }}
        >
            <Typography variant="h6">Item not found</Typography>;
        </Box >)
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

            <ItemDetailsCard
                item={item}
                setReportSubmissionVisible={setReportSubmissionVisible}
            />

            <ReportSubmissionModal
                open={isReportSubmissionVisible}
                onClose={() => setReportSubmissionVisible(false)}
            />
        </Box >
    );
};

export default ItemDetails;

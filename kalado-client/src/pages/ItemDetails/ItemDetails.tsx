import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { ReportSubmissionForm, ItemDetailsCard } from '../../components/organisms';
import { getSingleProduct } from '../../api/services/ProductService';

interface Item {
    title: string;
    imageUrl: string;
    price: number;
    city: string;
    date: string;
    description: string;
    itemId: number;
    seller_phone: string;
}

const ItemDetails: React.FC = () => {
    const { t } = useTranslation();
    const { itemId } = useParams<{ itemId: string }>();
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchItem = async () => {
            if (!itemId) {
                setError(t("error.general"));
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                console.log("GetSingleProduct API call");
                console.log(itemId);
                const fetchedItem = await getSingleProduct(Number(itemId));
                console.log(fetchedItem);
                setItem(fetchedItem);
            } catch (err) {
                setError(t("error.general"));
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [itemId, t]);

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
            {loading && <CircularProgress />}
            {!loading && (error || !item) && (
                <Typography variant="h6">{t("error.item_details.not_found")}</Typography>
            )}
            {!loading && item && (
                <>
                    <ItemDetailsCard item={item} />
                    <ReportSubmissionForm />
                </>
            )}
        </Box>
    );
};

export default ItemDetails;

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
    const { itemId } = useParams<{ itemId: number }>();
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchItem = async () => {
            try {
                setLoading(true);
                // getSingleProduct API call
                const fetchedItem = await getSingleProduct(itemId);
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
            {
                (loading) && (<CircularProgress />)
            }

            {
                (!item || error) &&
                (<Typography variant="h6">{t("item_details.not_found")}</Typography>)
            }
            {
                <>
                    <ItemDetailsCard
                        item={item}
                    />

                    <ReportSubmissionForm />
                </>
            }
        </Box >
    );
};

export default ItemDetails;

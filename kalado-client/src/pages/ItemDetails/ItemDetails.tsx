import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ReportSubmissionForm, ItemDetailsCard, NavBar } from '../../components/organisms';
import { useProductContext } from '../../contexts';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


const ItemDetails: React.FC = () => {
    const { t } = useTranslation();
    const { itemId } = useParams<{ itemId: string }>();
    const { singleProduct, loading, error, fetchSingleProduct } = useProductContext();

    useEffect(() => {
        if (!itemId) return;
        fetchSingleProduct(Number(itemId));
    }, [itemId]);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 2 }}>
            <NavBar />
            {loading && <CircularProgress />}
            {!loading && (error || !singleProduct) && (
                <Box sx={{ textAlign: 'center' }}>
                    <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main' }} />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        {t("error.item_details.not_found")}
                    </Typography>
                </Box>
            )}
            {!loading && singleProduct && (
                <>
                    <ItemDetailsCard
                        item={singleProduct}
                        neededReportSubmissionForm={true}
                    />
                    <ReportSubmissionForm reportedContentId={Number(itemId)} />
                </>
            )}
        </Box>
    );
};

export default ItemDetails;

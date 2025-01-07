import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { ProductListBox, ItemSort } from '../../molecules';
import ItemCard from '../ItemCard/ItemCard';
import { useProductContext } from '../../../contexts/ProductContext';


interface ItemsHolderProps {
    selectedCategoryTitle: string;
}

const ItemsHolder: React.FC<ItemsHolderProps> = ({ selectedCategoryTitle }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { products, loading, error } = useProductContext();
    const [sortOption, setSortOption] = useState<string>('newest');

    const sortedItems = () => {
        if (!products) return [];
        return [...products].sort((a, b) => {
            switch (sortOption) {
                case 'most_expensive':
                    return b.price - a.price;
                case 'most_cheap':
                    return a.price - b.price;
                case 'oldest':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                case 'newest':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                default:
                    return 0;
            }
        });
    };

    const handleItemSelect = (itemId: number) => {
        navigate(`/item/${itemId}`);
    };

    const renderLoadingOrError = () => (
        <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 5 }}>
            {loading ? <CircularProgress /> : error || t("error.landing.error_get_product")}
        </Typography>
    );

    const formatDate = (timestamp: string | null): string => {
        if (!timestamp) return t("item_details.no_date");
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    };

    const renderItems = () => {
        if (error) {
            return (
                <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 5 }}>
                    {t("error.landing.error_get_product")}
                </Typography>
            );
        }

        if (!products || products.length === 0) {
            return (
                <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 5 }}>
                    {t("error.landing.empty_product_list")}
                </Typography>
            );
        }

        return (
            <>
                <ItemSort
                    sortOption={sortOption}
                    setSortOption={(e) => setSortOption(e.target.value as string)}
                />
                <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 5 }}>
                    {selectedCategoryTitle}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: products.length === 1 ? 'center' : 'space-between',
                    gap: 2,
                    flexGrow: 1,
                }}>
                    {sortedItems().map(item => (
                        <Box key={item.itemId} sx={{
                            flexBasis: { xs: '100%', sm: '50%', md: products.length === 1 ? '100%' : '30%' },
                            mb: 2,
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <ItemCard
                                title={item.title}
                                price={`${item.price.amount.toLocaleString()} ${t("currency")}`}
                                createdAt={formatDate(item.createdAt)}
                                imageUrls={item.imageUrls}
                                onClick={() => handleItemSelect(item.id)}
                            />
                        </Box>
                    ))}
                </Box>
            </>
        );
    };

    return (
        <ProductListBox>
            {loading || error || !products ? renderLoadingOrError() : renderItems()}
        </ProductListBox>
    );
};

export default ItemsHolder;

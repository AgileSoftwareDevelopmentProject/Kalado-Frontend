import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, CircularProgress } from '@mui/material';
import { ProductListBox } from '../../molecules';
import ItemCard from '../ItemCard/ItemCard';
import { getProductsByCategory } from '../../../services/getProductsByCategoryService';
import defaultImage from '../../../assets/images/no-image.png';

interface Item {
    title: string;
    imageUrl: string;
    price: number;
    city: string;
    date: string;
    itemId: string;
}

interface ItemsHolderProps {
    onItemSelect: (itemId: string) => void;
    selectedCategoryTitle: string;
}

const ItemsHolder: React.FC<ItemsHolderProps> = ({ onItemSelect, selectedCategoryTitle }) => {
    const { t, i18n } = useTranslation();
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadItems = async () => {
            try {
                const fetchedData = await getProductsByCategory(selectedCategoryTitle, '');
                const fetchedItems = Array.isArray(fetchedData) ? fetchedData : [];
                setItems(fetchedItems as Item[]);
            } catch (error) {
                setError(t("error.general"));
            } finally {
                setLoading(false);
            }
        };

        loadItems();
    }, [selectedCategoryTitle])

    if (loading) {
        return (
            <ProductListBox>
                <CircularProgress />
            </ProductListBox>
        );
    }

    if (items.length === 0) {
        return (
            <ProductListBox>
                <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {error ? error : t("error.landing.empty_product_list")}
                </Typography>
            </ProductListBox>
        );
    }

    return (
        <ProductListBox>
            <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                {selectedCategoryTitle}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: 2,
                    flexGrow: 1,
                }}
            >
                {items.map(item => (
                    <Box
                        key={item.itemId}
                        sx={{
                            flexBasis: { xs: '100%', sm: '48%', md: '30%' },
                            mb: 2,
                        }}
                    >
                        <ItemCard
                            title={item.title}
                            price={`${item.price.toLocaleString()} ${t("currency")} `}
                            city={item.city}
                            date={item.date}
                            image={item.imageUrl || defaultImage}
                            onClick={() => onItemSelect(item.itemId)}
                        />
                    </Box>
                ))}
            </Box>
        </ProductListBox>
    );
};

export default ItemsHolder;

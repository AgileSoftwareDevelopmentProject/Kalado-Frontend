import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { ProductListBox, ItemSort } from '../../molecules';
import ItemCard from '../ItemCard/ItemCard';
import { getProductsByCategory } from '../../../api/services/ProductService';
import defaultImage from '../../../assets/images/no-image.png';

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

interface ItemsHolderProps {
    selectedCategoryTitle: string;
}

const ItemsHolder: React.FC<ItemsHolderProps> = ({ selectedCategoryTitle }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [sortOption, setSortOption] = useState<string>('newest');

    useEffect(() => {
        const loadItems = async () => {
            setLoading(true);
            setError('');
            try {
                const fetchedData = await getProductsByCategory(selectedCategoryTitle);
                setItems(fetchedData);
                // Check if fetchedData is null or empty
                // if (response.isSuccess) {
                //     fetchedData = response.data;
                //     if (!fetchedData || fetchedData.length === 0) {

                //         setError(t("error.landing.empty_product_list"));
                //     } else {

                //     }
                // }

            } catch (error) {
                setError(t("error.landing.error_get_product"));
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadItems();
    }, [selectedCategoryTitle, t]);

    const sortedItems = () => {
        return [...items].sort((a, b) => {
            switch (sortOption) {
                case 'most_expensive':
                    return b.price - a.price;
                case 'most_cheap':
                    return a.price - b.price;
                case 'oldest':
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                case 'newest':
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
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
            {loading ? <CircularProgress /> : error}
        </Typography>
    );

    const renderItems = () => (
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
                justifyContent: items.length === 1 ? 'center' : 'space-between',
                gap: 2,
                flexGrow: 1,
            }}>
                {sortedItems().map(item => (
                    <Box key={item.itemId} sx={{
                        flexBasis: { xs: '100%', sm: '50%', md: items.length === 1 ? '100%' : '30%' },
                        mb: 2,
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <ItemCard
                            title={item.title}
                            price={`${item.price.toLocaleString()} ${t("currency")}`}
                            city={item.city}
                            date={item.date}
                            image={item.imageUrl || defaultImage}
                            onClick={() => handleItemSelect(item.itemId)}
                        />
                    </Box>
                ))}
            </Box>
        </>
    );

    return (
        <ProductListBox>
            {loading || error ? renderLoadingOrError() : renderItems()}
        </ProductListBox>
    );
};

export default ItemsHolder;

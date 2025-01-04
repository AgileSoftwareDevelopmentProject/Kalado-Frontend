import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, CircularProgress } from '@mui/material';
import { ProductListBox, ItemSort } from '../../molecules';
import ItemCard from '../ItemCard/ItemCard';
import { getProductsByCategory } from '../../../api/services/product/getProductsByCategoryService';
import defaultImage from '../../../assets/images/no-image.png';
import mockData from '../../../mockData.json';

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
    const { t } = useTranslation();
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [sortOption, setSortOption] = useState<string>('newest');

    useEffect(() => {
        const loadItems = async () => {
            try {
                setLoading(true);
                // getProductByCategory API call

                // const fetchedData = getProductsByCategory(selectedCategoryTitle);
                const fetchedData = mockData.items;
                console.log("QQQQQQQQQQQQQQQ");
                // console.log(fetchedData);
                const fetchedItems = Array.isArray(fetchedData) ? fetchedData : [];
                console.log(fetchedItems);
                setItems(fetchedItems as Item[]);
            } catch (error) {
                setError(t("error.landing.error_get_product"));
            } finally {
                setLoading(false);
            }
        };

        loadItems();
    }, []);

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

    const displayedItems = sortedItems();

    return (
        <ProductListBox>
            {
                (loading) && (<CircularProgress />)
            }

            {
                (items.length === 0) &&
                (<Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 5 }}>
                    {error ? error : t("error.landing.empty_product_list")}
                </Typography>)
            }

            {
                (items.length !== 0) && (!!error) &&
                <>
                    <ItemSort
                        sortOption={sortOption}
                        setSortOption={(e) => setSortOption(e.target.value as string)}
                    />

                    <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 5 }}>
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
                        {displayedItems.map(item => (
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
                </>
            }
        </ProductListBox>
    );
};

export default ItemsHolder;

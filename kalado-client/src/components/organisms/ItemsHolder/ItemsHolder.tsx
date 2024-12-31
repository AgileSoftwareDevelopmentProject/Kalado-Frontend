import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import ItemCard from '../ItemCard/ItemCard';
import defaultImage from '../../../assets/images/default-image-url.jpg';

interface Item {
    title: string;
    imageUrl: string;
    price: number;
    city: string;
    date: string;
    itemId: string;
}

interface ItemsHolderProps {
    items: Item[];
    onItemSelect: (itemId: string) => void;
    selectedCategoryTitle: string | null;
}

const ItemsHolder: React.FC<ItemsHolderProps> = ({ items, onItemSelect, selectedCategoryTitle }) => {
    const { t, i18n } = useTranslation();

    return (
        <Box
            sx={{
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                paddingTop: '200px',
                paddingRight: i18n.language === 'en' ? '0px' : '150px',
                paddingLeft: i18n.language === 'en' ? '150px' : '0px',
            }}
        >
            <Typography variant="h4" sx={{ textAlign: 'center', mt: 4, mb: 10, fontWeight: 'bold' }}>
                {selectedCategoryTitle ? selectedCategoryTitle : t("category.select")}
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
        </Box>
    );
};

export default ItemsHolder;

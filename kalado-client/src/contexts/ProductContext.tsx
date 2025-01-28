import React, { createContext, useState, useContext, useEffect } from 'react';
import { getProductsByCategory, getSingleProduct } from '../api/services/ProductService';
import { getSearchByKeyword, getSearchByPriceRange, getSearchByMultipleFilters } from '../api/services/SearchService';
import { TProductResponseType } from '../constants/apiTypes';
import { OptionsComponent } from '../constants/options';


interface ProductContextType {
    selectedCategory: { value: string; title: string; };
    products: TProductResponseType[];
    singleProduct: TProductResponseType | null;
    loading: boolean;
    error: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<{ value: string; title: string; }>>;
    fetchProductsByCategory: () => void;
    fetchSingleProduct: (id: number) => Promise<TProductResponseType | null>;
    applyFilters: (minPrice: number | 0, maxPrice: number | 0, timeFilter: string | '') => void;
    searchProductsByKeyword: (keyword: string) => void;
    searchProductsByPriceRange: (minPrice: number | 0, maxPrice: number | 0) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState({
        value: OptionsComponent().product_categories[0].value,
        title: OptionsComponent().product_categories[0].title
    });
    const [products, setProducts] = useState<TProductResponseType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [singleProduct, setSingleProduct] = useState<TProductResponseType | null>(null);

    const fetchProductsByCategory = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await getProductsByCategory(selectedCategory.value);
            const filteredProducts = response.filter((product: TProductResponseType) =>
                product.status === 'ACTIVE' || product.status === 'RESERVED'
            );
            setProducts(filteredProducts);
        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductsByCategory();
    }, [selectedCategory]);

    const fetchSingleProduct = async (id: number) => {
        setLoading(true);
        setError('');
        try {
            const response = await getSingleProduct(id);
            setSingleProduct(response.data);
        } catch (err) {
            setError('Failed to fetch the product');
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = async (minPrice: number | 0, maxPrice: number | 0, timeFilter: string | '') => {
        setLoading(true);
        setError('');
        try {
            const response = await getSearchByMultipleFilters('', minPrice, maxPrice, timeFilter);
            setProducts(response.content);
        } catch (err) {
            setError('Failed to apply filters');
        } finally {
            setLoading(false);
        }
    };

    const searchProductsByKeyword = async (keyword: string) => {
        setLoading(true);
        setError('');
        try {
            const response = await getSearchByKeyword(keyword);
            setProducts(response.content);
        } catch (err) {
            setError('Failed to search products');
        } finally {
            setLoading(false);
        }
    };

    const searchProductsByPriceRange = async (minPrice: number | 0, maxPrice: number | 0) => {
        setLoading(true);
        setError('');
        try {
            const response = await getSearchByPriceRange(minPrice, maxPrice);
            setProducts(response.content);
        } catch (err) {
            setError('Failed to search products');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProductContext.Provider value={{
            selectedCategory,
            products,
            singleProduct,
            loading,
            error,
            setSelectedCategory,
            fetchProductsByCategory,
            fetchSingleProduct,
            applyFilters,
            searchProductsByKeyword,
            searchProductsByPriceRange
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};

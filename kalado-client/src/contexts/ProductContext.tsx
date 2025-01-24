import React, { createContext, useState, useContext } from 'react';
import { getProductsByCategory, getSingleProduct } from '../api/services/ProductService';
import { getSearchByKeyword, getSearchByPriceRange, getSearchByMultipleFilters } from '../api/services/SearchService';


interface Product {
    id: number;
    title: string;
    createdAt: string;
    imageUrls?: string[];
    price: {
        amount: number,
        unit: string,
    },
    description?: string;
    sellerPhoneNumber?: string;
    sellerId: number;
    brand?: string;
    productionYear?: string;
}

interface ProductContextType {
    products: Product[];
    singleProduct: Product | null;
    loading: boolean;
    error: string;
    fetchProductsByCategory: (category: string) => void;
    fetchSingleProduct: (id: number) => Promise<Product | null>;
    applyFilters: (minPrice: number | 0, maxPrice: number | 0, timeFilter: string | '') => void;
    searchProductsByKeyword: (keyword: string) => void;
    searchProductsByPriceRange: (minPrice: number | 0, maxPrice: number | 0) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [singleProduct, setSingleProduct] = useState<Product | null>(null);

    const fetchProductsByCategory = async (category: string) => {
        setLoading(true);
        setError('');
        try {
            console.log('Fetching products by Category');
            console.log(category)
            const response = await getProductsByCategory(category);
            setProducts(response);
            console.log(response);
        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const fetchSingleProduct = async (id: number): Promise<Product | null> => {
        setLoading(true);
        setError('');
        try {
            console.log('Fetching single product');
            console.log(id);
            const response = await getSingleProduct(id);
            setSingleProduct(response.data);
            console.log(response);
            return response;
        } catch (err) {
            setError('Failed to fetch the product');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = async (minPrice: number | 0, maxPrice: number | 0, timeFilter: string | '') => {
        setLoading(true);
        setError('');
        try {
            console.log('Fetching products by multiple filters');
            const response = await getSearchByMultipleFilters('', minPrice, maxPrice, timeFilter);
            setProducts(response.data);
            console.log(response);
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
            console.log('Fetching products by search keyword');
            const response = await getSearchByKeyword(keyword);
            setProducts(response);
            console.log(response);
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
            console.log('Fetching products by price range');
            const response = await getSearchByPriceRange(minPrice, maxPrice);
            setProducts(response);
            console.log(response);
        } catch (err) {
            setError('Failed to search products');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProductContext.Provider value={{
            products,
            singleProduct,
            loading,
            error,
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

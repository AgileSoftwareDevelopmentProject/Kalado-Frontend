import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProductsByCategory, getSingleProduct } from '../../api/services/ProductService';

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
    seller_phone?: string;
    sellerId: number;
    brand?: string;
    productionYear?: string;
}

interface ProductState {
    products: Product[];
    singleProduct: Product | null;
    loading: boolean;
    error: string;
}

const initialState: ProductState = {
    products: [],
    singleProduct: null,
    loading: false,
    error: '',
};

// Async thunk for fetching products
export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchByCategory',
    async (category: string) => {
        const response = await getProductsByCategory(category);
        return response;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Failed to fetch products';
            });
    },
});

export default productSlice.reducer;

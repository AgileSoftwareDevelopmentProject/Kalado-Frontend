import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/product/productSlice';
import modalReducer from '../features/modal/modalSlice';
import languageReducer from '../features/language/languageSlice';
import themeReducer from '../features/theme/themeSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        modal: modalReducer,
        language: languageReducer,
        theme: themeReducer,
    },
});

export default store;

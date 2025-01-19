import { createSlice } from '@reduxjs/toolkit';
import i18n from 'i18next';


interface LanguageState {
    currentLanguage: string;
}

const initialState: LanguageState = {
    currentLanguage: 'fa',
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        toggleLanguage(state) {
            state.currentLanguage = state.currentLanguage === 'en' ? 'fa' : 'en';
            i18n.changeLanguage(state.currentLanguage);
            document.documentElement.dir = state.currentLanguage === 'fa' ? 'rtl' : 'ltr';
        },
    },
});

export const { toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;

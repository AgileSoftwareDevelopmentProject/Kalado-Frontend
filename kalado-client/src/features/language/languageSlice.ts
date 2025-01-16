import { createSlice } from '@reduxjs/toolkit';

interface LanguageState {
    currentLanguage: string;
}

const initialState: LanguageState = {
    currentLanguage: 'en',
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        toggleLanguage(state) {
            state.currentLanguage = state.currentLanguage === 'en' ? 'fa' : 'en';
            document.documentElement.dir = state.currentLanguage === 'fa' ? 'rtl' : 'ltr';
        },
    },
});

export const { toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
    isLoginVisible: boolean;
    isSignupVisible: boolean;
    isCodeVerificationVisible: boolean;
    isCreateAdVisible: boolean;
    isReportSubmissionVisible: boolean;
    isInProfile: boolean;
}

const initialState: ModalState = {
    isLoginVisible: false,
    isSignupVisible: false,
    isCodeVerificationVisible: false,
    isCreateAdVisible: false,
    isReportSubmissionVisible: false,
    isInProfile: false,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setLoginVisible(state, action) {
            state.isLoginVisible = action.payload;
        },
        setSignupVisible(state, action) {
            state.isSignupVisible = action.payload;
        },
        // Add other modal visibility states as needed
    },
});

export const { setLoginVisible, setSignupVisible } = modalSlice.actions;
export default modalSlice.reducer;

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
        openLogin(state) {
            state.isSignupVisible = false;
            state.isLoginVisible = true;
        },
        closeLogin(state) {
            state.isLoginVisible = false;
        },
        openSignup(state) {
            state.isLoginVisible = false;
            state.isSignupVisible = true;
        },
        closeSignup(state) {
            state.isSignupVisible = false;
        },
        openCodeVerification(state) {
            state.isSignupVisible = false;
            state.isCodeVerificationVisible = true;
        },
        closeCodeVerification(state) {
            state.isCodeVerificationVisible = false;
        },
        openCreateAd(state) {
            state.isCreateAdVisible = true;
        },
        closeCreateAd(state) {
            state.isCreateAdVisible = false;
        },
        openReportSubmission(state) {
            state.isReportSubmissionVisible = true;
        },
        closeReportSubmission(state) {
            state.isReportSubmissionVisible = false;
        },
        openDashboard(state) {

        },
        logout(state) {

        },
        closePopups(state) {
            console.log("RRRRRRRrr");
            state.isLoginVisible = false;
            state.isSignupVisible = false;
            state.isCodeVerificationVisible = false;
            state.isCreateAdVisible = false;
            state.isReportSubmissionVisible = false;;
        },
        //other modal-related reducers...
    },
});

export const {
    openLogin,
    closeLogin,
    openSignup,
    closeSignup,
    openCodeVerification,
    closeCodeVerification,
    openCreateAd,
    closeCreateAd,
    openDashboard,
    logout,
    closePopups,
} = modalSlice.actions;

export default modalSlice.reducer;
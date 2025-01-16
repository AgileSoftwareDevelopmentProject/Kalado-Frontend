import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    userRole: string | null;
}

const initialState: AuthState = {
    token: null,
    userRole: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload;
        },
        setUserRole(state, action: PayloadAction<string | null>) {
            state.userRole = action.payload;
        },
    },
});

export const { setToken, setUserRole } = authSlice.actions;
export default authSlice.reducer;

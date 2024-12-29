import axios from 'axios';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, CodeVerifyRequest, CodeVerifyResponse } from './types';

const API_BASE_URL = 'http://kaladoshop.com:8083/v1';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const handleResponse = <T>(response: any): T => {
    return response.data;
};

const handleError = (error: any) => {
    if (error.response) {
        return { success: false, message: error.response.data.message || 'An error occurred' };
    } else if (error.request) {
        return { success: false, message: 'No response from server' };
    } else {
        return { success: false, message: error.message };
    }
};

// API calls
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
        return handleResponse<LoginResponse>(response);
    } catch (error) {
        return handleError(error);
    }
};

export const register = async (userData: RegisterRequest): Promise<RegisterResponse> => {
    try {
        const response = await apiClient.post<RegisterResponse>('/auth/register', userData);
        return handleResponse<RegisterResponse>(response);
    } catch (error) {
        return handleError(error);
    }
};

export const codeVerify = async (token: CodeVerifyRequest): Promise<CodeVerifyResponse> => {
    try {
        const response = await apiClient.post<RegisterResponse>('/auth/register', token);
        return handleResponse<RegisterResponse>(response);
    } catch (error) {
        return handleError(error);
    }
};
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://kaladoshop.com:8081', // Ensure your base URL is correct
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptors to attach the token dynamically
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const sendRequest = async <T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: any,
    params?: any,
    headers?: Record<string, string>
): Promise<T> => {
    try {
        const response = await instance({
            url,
            method,
            data,
            params,
            headers: {
                ...headers,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error('Axios request error:', error.response || error.message);
        throw error.response?.data || { message: 'An error occurred' };
    }
};

export default instance;

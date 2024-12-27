import axios from 'axios';
import { BASE_URL as baseURL } from './urls';
import { toast } from 'sonner';
import errorTranslations from './errorTranslations';

const axiosInstance = axios.create({ baseURL });

// Request Interceptor
axiosInstance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    const isPublicEndpoint = config.url?.includes('/signup') || config.url?.includes('/login');
    console.log('-----------------------------------');
    if (token && !isPublicEndpoint) {
        console.log('[Request] Attaching Authorization Token:', token);
        config.headers['Authorization'] = token;
    } else {
        console.log('[Request] No Authorization Token or Public Endpoint');
    }
    if (process.env.NODE_ENV === 'development') {
        console.log('[Request] Config:', config);
    }
    return config;
});

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        if (process.env.NODE_ENV === 'development') {
            console.log('-----------------------------------');
            console.log('[Response] Success:', response);
        }
        return response;
    },
    (error) => {
        const statusCode = error?.response?.status;
        console.log('-----------------------------------');
        console.error('[Response] Error Status Code:', statusCode, 'Error:', error);

        if (statusCode === 401 || statusCode === 403) {
            const currentPath = window.location.pathname;
            console.warn('[Response] Unauthorized or Forbidden. Redirecting if needed.');
            if (currentPath !== '/login' && currentPath !== '/signup') {
                console.log('[Response] Clearing Auth Storage and Redirecting to /login');
                localStorage.removeItem('auth-storage');
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

// API Request Function
type TApiResponse<T> = {
    isSuccess: boolean;
    data: T;
    status: number;
    message?: string;
};

type TMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export async function sendRequest<T>(
    url: string,
    method: TMethod,
    requestData?: any,
    signal?: AbortSignal
): Promise<TApiResponse<T>> {
    console.log('-----------------------------------');
    if (process.env.NODE_ENV === 'development') {
        console.log(`[Request] Sending Request: Method=${method}, URL=${url}, Data=`, requestData);
    }

    return axiosInstance
        .request({
            method,
            url,
            data: requestData,
            ...(signal ? { signal } : {}),
        })
        .then((response) => {
            console.log('-----------------------------------');
            if (process.env.NODE_ENV === 'development') {
                console.log('[Request] Success:', response.data);
            }
            return {
                isSuccess: true,
                data: response.data as T,
                status: response.status,
            };
        })
        .catch((error) => {
            const response = error?.response?.data || {};
            let message = response.message || 'An unknown error occurred.';

            console.log('-----------------------------------');
            if (message && errorTranslations[message]) {
                message = errorTranslations[message];
            } else {
                message = message.replace(/_/g, ' ');
            }

            console.error('[Request] Error Message:', message, 'Response Data:', response);
            toast.error(message || 'An unexpected error occurred.');

            return {
                isSuccess: false,
                data: response.data || null,
                status: error?.response?.status || 500,
                message,
            };
        });
}
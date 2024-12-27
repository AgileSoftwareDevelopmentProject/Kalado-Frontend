import axios, { AxiosError } from 'axios';
import { BASE_URL as baseURL } from './urls';
import { toast } from 'sonner';
import errorTranslations from './errorTranslations';

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');
        const isPublicEndpoint = config.url?.includes('/signup') || config.url?.includes('/login');
        console.log('-----------------------------------');
        if (token && !isPublicEndpoint) {
            console.log('[Request] Attaching Authorization Token:', token);
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            console.log('[Request] No Authorization Token or Public Endpoint');
        }

        if (process.env.NODE_ENV === 'development') {
            console.log('[Request] Config:', config);
        }
        return config;
    },
    (error) => {
        console.error('[Request] Interceptor Error:', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        if (process.env.NODE_ENV === 'development') {
            console.log('-----------------------------------');
            console.log('[Response] Success:', response);
        }
        return response;
    },
    (error: AxiosError) => {
        const statusCode = error.response?.status;
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

type TApiResponse<T> = {
    isSuccess: boolean;
    data: T | null;
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
    try {
        console.log('-----------------------------------');
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Request] Sending Request: Method=${method}, URL=${url}, Data=`, requestData);
        }

        const response = await axiosInstance.request({
            method,
            url,
            data: requestData,
            ...(signal ? { signal } : {}),
        });

        console.log('-----------------------------------');
        if (process.env.NODE_ENV === 'development') {
            console.log('[Request] Success:', response.data);
        }

        return {
            isSuccess: true,
            data: response.data as T,
            status: response.status,
        };
    } catch (error) {
        const axiosError = error as AxiosError<{ message?: string; [key: string]: any }>;
        const response = axiosError.response?.data || {};
        const message = response.message || 'An unknown error occurred.';

        console.log('-----------------------------------');
        if (message && errorTranslations[message]) {
            toast.error(errorTranslations[message]);
        } else {
            toast.error(message.replace(/_/g, ' '));
        }

        console.error('[Request] Error Message:', message, 'Response Data:', response);

        return {
            isSuccess: false,
            data: null,
            status: axiosError.response?.status || 500,
            message,
        };
    }
}
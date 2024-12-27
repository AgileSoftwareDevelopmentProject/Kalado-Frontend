import axios from 'axios';
import { BASE_URL as baseURL } from './urls';
import { toast } from 'sonner';
import errorTranslations from './errorTranslations';

const axiosInstance = axios.create({ baseURL });

axiosInstance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    console.log('-----------------------------------');
    if (token) {
        console.log('[Request] Attaching Authorization Token:', token);
        config.headers['Authorization'] = token;
    } else {
        console.log('[Request] No Authorization Token Found');
    }
    console.log('[Request] Config:', config);
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        console.log('-----------------------------------');
        console.log('[Response] Success:', response);
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
    console.log(`[Request] Sending Request: Method=${method}, URL=${url}, Data=`, requestData);
    return axiosInstance
        .request({
            method,
            url,
            data: requestData,
            ...(signal ? { signal } : {}),
        })
        .then((response) => {
            console.log('-----------------------------------');
            console.log('[Request] Success:', response.data);
            return {
                isSuccess: true,
                data: response.data as T,
                status: response.status,
            };
        })
        .catch((error) => {
            const response = error?.response?.data || {};
            let message = response.message || 'خطایی رخ داده است.';

            console.log('-----------------------------------');
            if (message && errorTranslations[message]) {
                message = errorTranslations[message];
            } else {
                message = message.replace(/_/g, ' ');
            }

            console.error('[Request] Error Message:', message, 'Response Data:', response);
            toast.error(message);

            return {
                isSuccess: false,
                ...response,
            };
        });
}
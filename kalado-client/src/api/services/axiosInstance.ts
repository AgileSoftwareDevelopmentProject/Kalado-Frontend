import axios, { AxiosError } from 'axios';
import { BASE_URL as baseURL } from './urls';
import { toast } from 'sonner';
import errorTranslations from '../../errorTranslations';

const axiosInstance = axios.create({ baseURL });

interface ErrorResponseData {
    message?: string;
    [key: string]: any;
}

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');
        const isPublicEndpoint = config.url?.includes('/signup') || config.url?.includes('/login');

        console.log('-----------------------------------');
        console.log('[Request] URL:', config.url);
        console.log('[Request] Method:', config.method);
        console.log('[Request] Headers:', config.headers);
        console.log('[Request] Data:', config.data);

        if (token && !isPublicEndpoint) {
            config.headers['Authorization'] = `Bearer ${token}`;
            console.log('[Request] Authorization Token Attached');
        } else {
            console.log('[Request] Public Endpoint - No Token Attached');
        }

        console.log('-----------------------------------');
        return config;
    },
    (error) => {
        console.error('[Request Interceptor] Error:', error);
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => {
        console.log('-----------------------------------');
        console.log('[Response] URL:', response.config.url);
        console.log('[Response] Status:', response.status);
        console.log('[Response] Data:', response.data);
        console.log('-----------------------------------');
        return response;
    },
    (error: AxiosError<ErrorResponseData>) => {
        const statusCode = error.response?.status;
        console.log('-----------------------------------');
        console.error('[Response Interceptor] Error Status:', statusCode);
        console.error('[Response Interceptor] Error Data:', error.response?.data);
        console.log('-----------------------------------');

        if (statusCode === 401 || statusCode === 403) {
            console.warn('[Response Interceptor] Unauthorized or Forbidden. Redirecting...');
            localStorage.clear();
            window.location.href = '/login';
        }

        const message = error.response?.data?.message || 'An unknown error occurred.';
        toast.error(
            statusCode === 409
                ? 'This email is already registered.'
                : errorTranslations[message] || message.replace(/_/g, ' ')
        );

        return Promise.reject(error);
    }
);

// Request Wrapper Function
export async function sendRequest<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    requestData?: any,
    signal?: AbortSignal
): Promise<{ isSuccess: boolean; data: T | null; status: number; message?: string }> {
    try {
        console.log('-----------------------------------');
        console.log(`[Request Wrapper] Sending Request: Method=${method}, URL=${url}, Data=`, requestData);
        const response = await axiosInstance.request({
            method,
            url,
            data: requestData,
            signal,
        });

        console.log('[Request Wrapper] Success:', response.data);
        return {
            isSuccess: true,
            data: response.data as T,
            status: response.status,
        };
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponseData>;
        console.error('[Request Wrapper] Error:', axiosError);

        // Accessing message from error.response?.data
        const message = axiosError.response?.data?.message || 'An unknown error occurred.';

        return {
            isSuccess: false,
            data: null,
            status: axiosError.response?.status || 500,
            message,
        };
    }
}
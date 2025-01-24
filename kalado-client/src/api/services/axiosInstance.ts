import axios, { AxiosError } from 'axios';
import { BASE_URL as baseURL } from './urls';
import i18n from '../../i18n';

const axiosInstance = axios.create({ baseURL });

interface ErrorResponseData {
    message?: string;
    [key: string]: any;
}

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');

        console.log('-----------------------------------');
        console.log('[Request] URL:', config.url);
        console.log('[Request] Method:', config.method);
        console.log('[Request] Headers:', config.headers);
        console.log('[Request] Data:', config.data);

        if (token) {
            config.headers['Authorization'] = `${token}`;
            console.log('[Request] Authorization Token Attached');
        } else {
            console.log('[Request] Public Endpoint - No Token Attached');
        }

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

        if (!error.response) {
            return Promise.resolve({
                isSuccess: false,
                data: null,
                status: 0,
                message: i18n.t('error.general'),
            });
        }

        console.log('-----------------------------------');
        console.error('[Response Interceptor] Error Status:', statusCode);
        console.error('[Response Interceptor] Error Data:', error.response?.data);
        console.log('-----------------------------------');

        const message = statusCode ? i18n.t(`error.server.${statusCode}`) : i18n.t(`error.general`);

        return Promise.resolve({
            isSuccess: false,
            data: null,
            status: statusCode,
            message: message,
        });
    }
);

export async function sendRequest<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    headers?: Record<string, string>,
    requestData?: any,
    signal?: AbortSignal,
): Promise<{ isSuccess: boolean; data: T | null; status: number; message?: string }> {
    try {
        const response = await axiosInstance.request({
            method,
            url,
            headers: headers ? { ...headers } : {},
            data: requestData,
            signal,
        });

        return {
            isSuccess: true,
            data: response.data as T,
            status: response.status,
        };
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponseData>;

        if (!axiosError.response) {
            return {
                isSuccess: false,
                data: null,
                status: 0,
                message: i18n.t('error.general'),
            };
        }

        const message = axiosError.response?.data?.message || 'An unknown error occurred.';

        return {
            isSuccess: false,
            data: null,
            status: axiosError.response?.status || 500,
            message,
        };
    }
}

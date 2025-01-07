import axios, { AxiosError } from 'axios';
import { BASE_URL as baseURL } from './urls';
import { toast } from 'sonner';
import { useAuth } from '../../contexts';

const axiosInstance = axios.create({ baseURL });

interface ErrorResponseData {
    message?: string;
    [key: string]: any;
}

axiosInstance.interceptors.request.use(

    async (config) => {

        const isPublicEndpoint = config.url?.includes('/signup') || config.url?.includes('/login');


        console.log('-----------------------------------');

        console.log('[Request] URL:', config.url);

        console.log('[Request] Method:', config.method);

        console.log('[Request] Headers:', config.headers);

        console.log('[Request] Data:', config.data);


        // Let the Authorization header be set by the individual requests

        console.log('[Request] Headers:', config.headers);

        

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
        }

        const message = error.response?.data?.message || 'An unknown error occurred.';
        toast.error(
            statusCode === 409
                ? 'This email is already registered.'
                : message || message.replace(/_/g, ' ')
        );

        return Promise.reject(error);
    }
);

// Request Wrapper Function
// export async function sendRequest<T>(
//     url: string,
//     method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
//     requestData?: any,
//     signal?: AbortSignal
// ): Promise<{ isSuccess: boolean; data: T | null; status: number; message?: string }> {
//     try {
//         console.log('-----------------------------------');
//         console.log(`[Request Wrapper] Sending Request: Method=${method}, URL=${url}, Data=`, requestData);
//         const response = await axiosInstance.request({
//             method,
//             url,
//             data: requestData,
//             signal,
//         });

//         console.log('[Request Wrapper] Success:', response.data);
//         return {
//             isSuccess: true,
//             data: response.data as T,
//             status: response.status,
//         };
//     } catch (error) {
//         const axiosError = error as AxiosError<ErrorResponseData>;
//         console.error('[Request Wrapper] Error:', axiosError);

//         // Accessing message from error.response?.data
//         const message = axiosError.response?.data?.message || 'An unknown error occurred.';

//         return {
//             isSuccess: false,
//             data: null,
//             status: axiosError.response?.status || 500,
//             message,
//         };
//     }
// }

export async function sendRequest<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    requestData?: any,
    signal?: AbortSignal,
    headers: Record<string, string> = {}
): Promise<{ isSuccess: boolean; data: T | null; status: number; message?: string }> {
    try {
        console.log("#####################################3");
        console.log(url);
        console.log(method);
        console.log(requestData);
        console.log(headers);
        const response = await axiosInstance.request({
            method,
            url,
            data: requestData,
            signal,
            headers,
        });
        console.log("***** Response *****");
        console.log(response);
        return {
            isSuccess: true,
            data: response.data as T,
            status: response.status,
        };
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponseData>;
        const message = axiosError.response?.data?.message || 'An unknown error occurred.';
        return {
            isSuccess: false,
            data: null,
            status: axiosError.response?.status || 500,
            message,
        };
    }
}

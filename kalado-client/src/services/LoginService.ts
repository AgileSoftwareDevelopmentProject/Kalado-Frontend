import { sendRequest } from '../axiosInstance';
import { AUTH } from '../urls';
import { toast } from 'sonner';

type TLoginResponse = {
    token: string;
    user: {
        email: string;
        // add any other user fields here if necessary
    };
};

export async function loginUser(
    email: string,
    password: string
) {
    const payload = {
        email: String(email),
        password: String(password),
    };

    try {
        const response = await sendRequest<TLoginResponse>(AUTH.LOGIN, 'POST', payload);

        if (response.isSuccess) {
            toast.success('Login successful!');
            localStorage.setItem('token', response.data?.token || '');
            return response;
        } else {
            if (response.status === 401) {
                toast.error('Invalid email or password. Please try again.');
            } else {
                toast.error(response.message || 'Login failed.');
            }
            return response;
        }
    } catch (error) {
        console.error('[LoginService] Error:', error);

        toast.error('An unexpected error occurred during login.');
        return { isSuccess: false, message: 'An error occurred during login.' };
    }
}
import { sendRequest } from './axiosInstance';
import { AUTH } from './urls';
import { TLoginResponseType, UserData } from '../../utils/apiTypes';

// Login user
export async function loginUser(email: string, password: string) {
    try {
        console.log('Logging in with email:', email);
        const response = await sendRequest<TLoginResponseType>(
            AUTH.LOGIN,
            'POST',
            { email, password },
            undefined,
            { 'Content-Type': 'application/json' }
        );
        console.log('Login API response:', response);
        return response;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}

// Signup user
export async function signupUser(userData: UserData) {
    try {
        console.log('Signing up with data:', userData);
        const response = await sendRequest(
            AUTH.REGISTER,
            'POST',
            userData,
            undefined,
            { 'Content-Type': 'application/json' }
        );
        console.log('Signup API response:', response);
        return response;
    } catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }
}

// Verify code
export async function verifyCode(token: string) {
    return sendRequest(
        AUTH.VERIFY,
        'POST',
        new URLSearchParams({ token }).toString(),
        undefined,
        { 'Content-Type': 'application/x-www-form-urlencoded' }
    );
}
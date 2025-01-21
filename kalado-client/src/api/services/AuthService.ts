import { sendRequest } from './axiosInstance'
import { AUTH } from './urls'
import { TLoginResponseType, UserData } from '../../constants/apiTypes';


export async function loginUser(email: string, password: string) {
    return sendRequest<TLoginResponseType>(
        AUTH.LOGIN,
        'POST',
        { email, password },
        undefined,
        { 'Content-Type': 'application/json' }
    );
}


export async function signupUser(userData: UserData) {
    return sendRequest(
        AUTH.REGISTER,
        'POST',
        userData,
        undefined,
        {
            'Content-Type': 'application/json',
        }
    );
}


export async function verifyCode(token: string) {
    return sendRequest(
        AUTH.VERIFY,
        'POST',
        new URLSearchParams({ token }).toString(),
        undefined,
        { 'Content-Type': 'application/x-www-form-urlencoded' }
    );
}
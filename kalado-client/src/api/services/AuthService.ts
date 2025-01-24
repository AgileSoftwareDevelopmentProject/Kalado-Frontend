import { sendRequest } from './axiosInstance'
import { AUTH } from './urls'
import { TLoginResponseType, UserData } from '../../constants/apiTypes';


export async function loginUser(email: string, password: string) {
    return sendRequest<TLoginResponseType>(
        AUTH.LOGIN,
        'POST',
        {
            'Content-Type': 'application/json'
        },
        { email, password },
    );
}

export async function signupUser(userData: UserData) {
    return sendRequest(
        AUTH.REGISTER,
        'POST',
        {
            'Content-Type': 'application/json'
        },
        userData,
    );
}

export async function verifyCode(code: string) {
    return sendRequest(
        AUTH.VERIFY,
        'POST',
        {
            'Content-Type': 'application/json'
        },
        code,
    );
}

export async function forgetPassword(email: string) {
    return sendRequest(
        AUTH.FORGETPASSWORD,
        'POST',
        {
            'Content-Type': 'application/json'
        },
        email,
    );
}
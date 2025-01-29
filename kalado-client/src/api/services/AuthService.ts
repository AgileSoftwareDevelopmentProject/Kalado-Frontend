import { sendRequest } from './axiosInstance'
import { AUTH } from './urls'
import { TLoginResponseType, UserData } from '../../constants/apiTypes';
import { UserType } from '../../constants/types';


export async function loginUser(email: string, password: string) {
    return sendRequest<TLoginResponseType>(
        AUTH.LOGIN,
        'POST',
        { email, password },
        {},
        'application/json'
    );
}

export async function signupUser(userData: UserData) {
    return sendRequest(
        AUTH.REGISTER,
        'POST',
        userData,
        {},
        'application/json'
    );
}

export async function verifyCode(code: string) {
    return sendRequest(
        `${AUTH.VERIFY}?token=${code}`,
        'POST',
        null,
        {},
        'application/json'
    );
}

export async function forgetPassword(email: string) {
    return sendRequest(
        AUTH.FORETPASSWORD,
        'POST',
        { email },
        {},
        'application/json'
    );
}

export async function resetPassword(token: string, newPassword: string) {
    return sendRequest(
        AUTH.RESETPASSWORD,
        'POST',
        { token, newPassword },
        {},
        'application/json'
    );
}

export async function changeUserToAdmin(userId: number, role: UserType) {
    return sendRequest(
        AUTH.CHANGE_USER_ROLE(userId, role),
        'PUT'
    );
}

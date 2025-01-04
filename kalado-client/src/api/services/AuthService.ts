import { sendRequest } from './axiosInstance'
import { AUTH } from './urls'
import { UserData } from '../../utils/apiTypes';


// export async function signupReq(username: string, password: string, role: UserType) {
//     return sendRequest(AUTH.REGISTER, 'POST', { username, password, role })
// }

// export async function loginReq(username: string, password: string) {
//     return sendRequest<TLoginRes>(AUTH.LOGIN, 'POST', { username, password })
// }

// export async function logoutReq() {
//     return sendRequest(AUTH.LOGOUT, 'POST')
// }

export async function loginUser(email: string, password: string) {
    return sendRequest(
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

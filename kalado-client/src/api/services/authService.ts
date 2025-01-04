import { sendRequest } from './axiosInstance'
import { AUTH } from './urls'
import { UserType } from '../../utils/types'
import { TLoginRes } from '../../utils/apiTypes'

export async function signupReq(username: string, password: string, role: UserType) {
    return sendRequest(AUTH.REGISTER, 'POST', { username, password, role })
}

export async function loginReq(username: string, password: string) {
    return sendRequest<TLoginRes>(AUTH.LOGIN, 'POST', { username, password })
}

export async function logoutReq() {
    return sendRequest(AUTH.LOGOUT, 'POST')
}

import { sendRequest } from './axiosInstance';
import { USER } from './urls';
import { ProfileData, TUserProfileResponse } from '../../utils/apiTypes';


export async function getProfile(token: string | null) {
    return sendRequest<TUserProfileResponse>(
        USER.GET_PROFILE,
        'GET',
        undefined,
        undefined,
        {
            Authorization: `Bearer ${token}`,
        }
    );
}


export async function modifyProfile(profileData: ProfileData, token: string | null) {
    return sendRequest(
        USER.MODIFY_PROFILE,
        'PUT',
        profileData,
        undefined,
        {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    );
}
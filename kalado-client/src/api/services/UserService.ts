import { sendRequest } from './axiosInstance';
import { USER } from './urls';
import { ProfileData, TUserProfileResponse } from '../../constants/apiTypes';


export async function getProfile() {
    return sendRequest<TUserProfileResponse>(
        USER.GET_PROFILE,
        'GET',
        undefined,
        undefined,
        {
            'Content-Type': 'application/json',
        }
    );
}


export async function modifyProfile(profileData: ProfileData) {
    return sendRequest(
        USER.MODIFY_PROFILE,
        'PUT',
        profileData,
        undefined,
        {
            'Content-Type': 'application/json',
        }
    );
}
import { sendRequest } from './axiosInstance';
import { USER } from './urls';
import { ProfileData, TUserProfileResponse } from '../../constants/apiTypes';


export async function getProfile() {
    return sendRequest<TUserProfileResponse>(
        USER.GET_PROFILE,
        'GET',
        undefined,
        {}
    );
}

export async function modifyProfile(profileData: ProfileData) {
    return sendRequest(
        USER.MODIFY_PROFILE,
        'PUT',
        profileData,
        {},
        'multipart/form-data'
    );
}

export async function getAllUsers() {
    return sendRequest(
        USER.ALL_USER,
        'GET',
        undefined,
        {},
        'application/json'
    );
}

export async function blockUser(token: string | null) {
    return sendRequest(
        USER.ALL_USER,
        'PUT',
        token,
        {},
        'application/json'
    );
}
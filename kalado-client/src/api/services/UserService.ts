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


export async function modifyProfile(profileData: ProfileData) {
    try {
        console.log('Modifying profile with data:', profileData);

        const response = await sendRequest(
            USER.MODIFY_PROFILE,
            'PUT',
            profileData,
            undefined,
            { 'Content-Type': 'application/json' }
        );
        console.log('Profile modification response:', response);
        return response;
    } catch (error) {
        console.error('Error during profile modification:', error);
        throw error;
    }
}
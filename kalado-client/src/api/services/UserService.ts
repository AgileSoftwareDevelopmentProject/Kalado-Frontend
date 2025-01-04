import { sendRequest } from './axiosInstance';
import { USER } from './urls';
import { ProfileData  } from '../../utils/apiTypes';



export async function getProfile(token: string) {
    return sendRequest(
        USER.GET_PROFILE,
        'GET',
        undefined, 
        undefined, 
        {
            Authorization: `Bearer ${token}`, 
        }
    );
}


export async function modifyProfile(token: string, profileData: ProfileData) {
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

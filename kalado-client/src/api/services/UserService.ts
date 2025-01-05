import { sendRequest } from './axiosInstance';
import { USER } from './urls';
import { ProfileData, TUserProfileResponse } from '../../utils/apiTypes';
import { useAuth } from '../../contexts/AuthContext';


export async function getProfile() {
    const { token } = useAuth();
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
    const { token } = useAuth();
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
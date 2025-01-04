import { sendRequest } from '../axiosInstance';
import { USER } from '../urls';

export async function getUser(token: string) {
    try {
        const response = await sendRequest(
            `${USER.GET}`,
            'GET',
            {Authorization: `Bearer ${token}`}
        );

        console.log('Response:', response); 

        if (response.isSuccess) {
            console.log('User received successfully!');
            return response.data;
        } else {
            console.log(response.message || 'Failed to receive user.');
        }

        return response;
    } catch (error) {
        console.error('An unexpected error occurred while receiving user.', error);
        return { isSuccess: false, message: 'An error occurred while receiving user.' };
    }
}

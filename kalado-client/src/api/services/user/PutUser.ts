import { sendRequest } from '../axiosInstance';
import { USER } from '../urls';

export async function putUser(
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string
) {
    const payload = {
        firstName,
        lastName,
        address,
        phoneNumber,
    };

    try {
        const response = await sendRequest<typeof payload>(USER.PUT, 'PUT', payload);

        console.log('Response:', response); 

        if (response.isSuccess) {
            console.log('User put successfully!');
        } else if (response.status === 400) {
            console.log('Bad Request. Please check the input data.');
        } else {
            console.log(response.message || 'Putting user failed.');
        }

        return response;
    } catch (error) {
        console.error('An unexpected error occurred during putting user.', error);
        return { isSuccess: false, message: 'An error occurred while putting the user.' };
    }
}

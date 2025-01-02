import { sendRequest } from '../axiosInstance';
import { AUTH } from '../urls';

export async function signupUser(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string
) {
    const payload = {
        firstName: String(firstName),
        lastName: String(lastName),
        email: String(email),
        phoneNumber: String(phoneNumber),
        password: String(password),
        role: 'USER',
    };

    try {
        const response = await sendRequest<typeof payload>(AUTH.REGISTER, 'POST', payload);

        console.log('Response:', response); 

        if (response.isSuccess) {
            // toast.success('Signup successful!');
            console.log('Signup successful!');
        } else if (response.status === 409) {
            // toast.error('This email is already registered. Please log in.');
            console.log('This email is already registered. Please log in.');
        } else {
            // toast.error(response.message || 'Signup failed.');
            console.log(response.message || 'Signup failed.');
        }

        return response;
    } catch (error) {
        // toast.error('An unexpected error occurred during signup.');
        console.log('An unexpected error occurred during signup.');
        return { isSuccess: false, message: 'An error occurred during signup.' };
    }
}
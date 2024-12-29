// import axios from 'axios';

// export const signupUser = async (formData: {
//     firstName: string;
//     lastName: string;
//     username: string;
//     email: string;
//     phoneNumber: string;
//     password: string;
// }) => {
//     try {
//         const response = await axios.post('https://kaladoshop.com/v1/auth/register', formData);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

import { sendRequest } from '../axiosInstance';
import { AUTH } from '../urls';
import { toast } from 'sonner';

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

        if (response.isSuccess) {
            toast.success('Signup successful!');
        } else if (response.status === 409) {
            toast.error('This email is already registered. Please log in.');
        } else {
            toast.error(response.message || 'Signup failed.');
        }

        return response;
    } catch (error) {
        toast.error('An unexpected error occurred during signup.');
        return { isSuccess: false, message: 'An error occurred during signup.' };
    }
}
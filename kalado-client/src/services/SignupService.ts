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

    const sanitizedFirstName = String(firstName);
    const sanitizedLastName = String(lastName);
    const sanitizedEmail = String(email);
    const sanitizedPhoneNumber = String(phoneNumber);
    const sanitizedPassword = String(password);
    const mockedRole = 'USER';

    try {
        const response = await sendRequest(AUTH.REGISTER, 'POST', {
            firstName: sanitizedFirstName,
            lastName: sanitizedLastName,
            email: sanitizedEmail,
            phoneNumber: sanitizedPhoneNumber,
            password: sanitizedPassword,
            role: mockedRole,
        });

        if (response.isSuccess) {
            toast.success('Signup successful!');
        } else {
            toast.error(response.message || 'Signup failed.');
        }

        return response;
    } catch (error) {
        console.error('[SignupUser] Error:', error);
        toast.error('An error occurred during signup.');
        return {
            isSuccess: false,
            message: 'An error occurred during signup.',
        };
    }
}
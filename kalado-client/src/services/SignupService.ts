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

export async function signupUser() {
    const firstName = 'dni';
    const lastName = 'nvb';
    const email = 'dnimioooo@gmail.com';
    const phoneNumber = '1234567890';
    const password = 'Asdf1234j';
    const role = 'USER';
    
    // if (!firstName || !lastName || !email || !phoneNumber) {
    //     toast.error('All fields are required.');
    //     return {
    //         isSuccess: false,
    //         message: 'Validation error: Missing required fields.',
    //     };
    // }
    try {
        const response = await sendRequest(AUTH.REGISTER, 'POST', {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            role,
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

// import { sendRequest } from '../axiosInstance';
// import { AUTH } from '../urls';

// type TLoginResponse = {
//     token: string;
//     user: {
//         email: string;
//         // we can add any other user fields here if necessary
//     };
// };

// export async function loginUser(
//     email: string,
//     password: string
// ) {
//     const payload = {
//         email: String(email),
//         password: String(password),
//     };

//     try {
//         const response = await sendRequest<TLoginResponse>(AUTH.LOGIN, 'POST', payload);

//         if (response.isSuccess) {
//             toast.success('Login successful!');
//             localStorage.setItem('token', response.data?.token || '');
//             return response;
//         } else {
//             if (response.status === 401) {
//                 toast.error('Invalid email or password. Please try again.');
//             } else if (response.status === 500) {
//                 toast.error('Server error. Please try again later.');
//             } else {
//                 toast.error(response.message || 'Login failed. Please check your credentials.');
//             }
//             return response;
//         }
//     } catch (error: unknown) {
//         console.error('[LoginService] Error:', error);

//         if (error instanceof AxiosError) {
//             const axiosError = error as AxiosError;
//             if (axiosError.response?.status === 401) {
//                 toast.error('Invalid email or password. Please try again.');
//             } else if (axiosError.response?.status === 500) {
//                 toast.error('Server error. Please try again later.');
//             } else {
//                 toast.error(axiosError.message || 'An unexpected error occurred during login.');
//             }
//         } else {
//             toast.error('An unexpected error occurred. Please check your connection.');
//         }

//         return { isSuccess: false, message: 'An error occurred during login.' };
//     }
// }


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

import { sendRequest } from './axiosInstance';
import { AUTH } from './urls';

export async function loginUser(
    email: string,
    password: string
) {
    const payload = {
        email: String(email),
        password: String(password)
    };

    try {
        const response = await sendRequest<typeof payload>(AUTH.LOGIN, 'POST', payload);

        console.log('Response:', response); 

        if (response.isSuccess) {
            console.log('Login successful!');
        } else {
            console.log(response.message || 'Signup failed.');
        }

        return response;
    } catch (error) {
        console.log('An unexpected error occurred during signup.', error);
        return { isSuccess: false, message: 'An error occurred during signup.' };
    }
}

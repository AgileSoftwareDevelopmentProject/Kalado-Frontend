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


import { sendRequest } from '../axiosInstance'
import { AUTH } from '../urls'


export async function signupUser( password: string, role: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string){
role = "USER";
return sendRequest(AUTH.REGISTER, 'POST', { firstName, lastName, email, phoneNumber, password, role})
}
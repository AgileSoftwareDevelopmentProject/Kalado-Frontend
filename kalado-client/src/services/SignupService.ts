import axios from 'axios';

export const signupUser = async (formData: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
}) => {
    try {
        const response = await axios.post('https://kaladoshop.com/v1/auth/register', formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

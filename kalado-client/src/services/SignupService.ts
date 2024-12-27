import axios from 'axios';

export const signupUser = async (formData: {
    username: string;
    password: string;
    role: string;
}) => {

    try {
        const response = await axios.post('http://kaladoshop.com:8083/v1/auth/register', formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

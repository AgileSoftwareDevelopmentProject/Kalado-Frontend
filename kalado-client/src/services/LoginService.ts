import axios from 'axios';

export const loginUser = async (formData: { email: string; password: string }) => {
    try {
        const response = await axios.post('http://kaladoshop.com:8083/v1/auth/login', formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
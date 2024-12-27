import axios from 'axios';

export const signupUser = async (formData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    passwordRepeat: string;
    role: string;
}) => {
    try {
        console.log("PPPP");
        console.log(formData);

        const { passwordRepeat, ...formDataWithoutRepeat } = formData;

        console.log(formDataWithoutRepeat);

        const response = await axios.post('http://kaladoshop.com:8083/v1/auth/register', formDataWithoutRepeat, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Signup error:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
};

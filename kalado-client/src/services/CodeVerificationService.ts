import axios from 'axios';

interface VerificationResponse {
    success: boolean;
    message?: string;
}

export const verifyCode = async (code: string): Promise<VerificationResponse> => {
    try {
        const response = await axios.post('https://kaladoshop.com/v1/verify-code', {
            code
        });
        return response.data;
    } catch (error) {
        console.error('API call error:', error);
        throw new Error('Verification failed. Please try again.');
    }
};

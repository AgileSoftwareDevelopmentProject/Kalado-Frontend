// CodeVerificationService.ts
import axios from 'axios';

interface VerificationResponse {
    // Define the structure of the response you expect from the API
    success: boolean;
    message?: string;
}

export const verifyCode = async (email: string, code: string): Promise<VerificationResponse> => {
    try {
        const response = await axios.post('https://kalado.com/verify-code', {
            email,
            code,
        });
        return response.data; // Assuming the API returns a JSON object
    } catch (error) {
        console.error('API call error:', error);
        throw new Error('Verification failed. Please try again.'); // Throw an error to be handled in the component
    }
};

import { sendRequest } from './axiosInstance';
import { AUTH } from './urls';

// interface CodeVerificationDTO {
//     token: string;
// }

// interface CodeVerificationProps {
//     email: string;
//     onClose: () => void;
// }

// export async function verifyCode(token: string, props: CodeVerificationProps) {
//     const payload: CodeVerificationDTO = {
//         token: String(token),
//     };

//     try {
//         const response = await sendRequest<typeof payload>(`${AUTH.VERIFY}/verify`, 'POST', payload);

//         console.log('Response:', response);

//         if (response.isSuccess) {
//             console.log('Code verification successful!');
//             props.onClose(); // Call the onClose callback on success
//         } else if (response.status === 400) {
//             console.log('Invalid or expired token. Please try again.');
//         } else {
//             console.log(response.message || 'Code verification failed.');
//         }

//         return response;
//     } catch (error) {
//         console.log('An unexpected error occurred during code verification.');
//         return { isSuccess: false, message: 'An error occurred during code verification.' };
//     }
// }

export async function verifyCode(code: string) {
    return sendRequest(AUTH.VERIFY, 'POST', { token: code })
}

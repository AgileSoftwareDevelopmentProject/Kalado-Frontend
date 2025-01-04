
import { sendRequest } from '../axiosInstance';
import { REPORT } from '../urls';

export async function getMyReports(token: string) {
    try {
        const response = await sendRequest(
            `${REPORT.GET_MY_REPORTS}`,
            'GET',
            {Authorization: `Bearer ${token}`}
        );

        console.log('Response:', response); 

        if (response.isSuccess) {
            console.log('Violations retrieved successfully!');
            return response.data;
        } else {
            console.log(response.message || 'Failed to retrieve violations.');
        }

        return response;
    } catch (error) {
        console.error('An unexpected error occurred while retrieving violations.', error);
        return { isSuccess: false, message: 'An error occurred while retrieving violations.' };
    }
}

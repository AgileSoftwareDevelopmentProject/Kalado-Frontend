
import { sendRequest } from '../../axiosInstance';
import { REPORT } from '../../urls';


export async function getAllReports(token: string) {
    try {
        const response = await sendRequest(
            `${REPORT.GET_ALL_REPORTS}`,
            'GET',
            { Authorization: `Bearer ${token}` ,'Content-Type': 'application/json'}
        );

        if (response.isSuccess) {
            console.log('All reports retrieved successfully!');
            return response.data;
        } else {
            console.log(response.message || 'Failed to retrieve reports.');
        }

        return response;
    } catch (error) {
        console.error('An unexpected error occurred while retrieving all reports.', error);
        return { isSuccess: false, message: 'An error occurred while retrieving all reports.' };
    }
}
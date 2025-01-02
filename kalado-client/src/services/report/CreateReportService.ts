import { sendRequest } from '../../axiosInstance';
import { REPORT } from '../../urls';

export async function createReport(
    violationType: string,
    description: string,
    reportedUserId: number,
    reportedContentId: number
) {
    const payload = {
        violationType,
        description,
        reportedUserId,
        reportedContentId,
    };

    try {
        const response = await sendRequest<typeof payload>(REPORT.CREATE, 'POST', payload);

        console.log('Response:', response); 

        if (response.isSuccess) {
            console.log('Violation reported successfully!');
        } else if (response.status === 400) {
            console.log('Bad Request. Please check the input data.');
        } else {
            console.log(response.message || 'Reporting failed.');
        }

        return response;
    } catch (error) {
        console.error('An unexpected error occurred during violation reporting.', error);
        return { isSuccess: false, message: 'An error occurred while reporting the violation.' };
    }
}

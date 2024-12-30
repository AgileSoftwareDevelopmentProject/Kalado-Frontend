import { sendRequest } from '../axiosInstance';
import { PRODUCT } from '../urls';

export async function updateAdStatus(
    id: number, // for the ad to update
    status: string, // new status for the ad
    sellerId: number 
) {
    const payload = {
        status,
        sellerId,
    };

    try {
        const response = await sendRequest<typeof payload>(`${PRODUCT.UPDATE_STATUS}/${id}`, 'PATCH', payload);

        if (response.isSuccess) {
            console.log('Ad status updated successfully!');
        } else if (response.status === 400) {
            console.log('Bad Request. Please check the input data.');
        } else {
            console.log(response.message || 'Ad status update failed.');
        }

        return response;
    } catch (error) {
        console.error('An unexpected error occurred during ad status update.', error);
        return { isSuccess: false, message: 'An error occurred during ad status update.' };
    }
}

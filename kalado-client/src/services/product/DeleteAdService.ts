import { sendRequest } from '../../axiosInstance';
import { PRODUCT } from '../../urls';

export async function deleteAd(
    id: number // for the ad to delete
) {
    try {
        const response = await sendRequest(`${PRODUCT.DELETE}/${id}`, 'DELETE');

        console.log('Response:', response); 

        if (response.isSuccess) {
            console.log('Ad deleted successfully!');
        } else if (response.status === 400) {
            console.log('Bad Request. Please check the input data.');
        } else {
            console.log(response.message || 'Ad deletion failed.');
        }

        return response;
    } catch (error) {
        console.error('An unexpected error occurred during ad deletion.', error);
        return { isSuccess: false, message: 'An error occurred during ad deletion.' };
    }
}

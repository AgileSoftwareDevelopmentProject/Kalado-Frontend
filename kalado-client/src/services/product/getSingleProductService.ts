import { sendRequest } from '../../axiosInstance';
import { PRODUCT } from '../../urls';

export async function getSingleProduct(productId: number, token: string) {
    try {
        const response = await sendRequest(
            `${PRODUCT.CREATE}/${productId}`, 
            'GET', 
            { Authorization: `Bearer ${token}` }
        );

        console.log('Response:', response); 

        if (response.isSuccess) {
            console.log('Single product retrieved successfully!');
            return response.data;
        } else {
            console.log(response.message || 'Failed to retrieve the product.');
        }

        return response;
    } catch (error) {
        console.error('An unexpected error occurred while retrieving the product.', error);
        return { isSuccess: false, message: 'An error occurred while retrieving the product.' };
    }
}

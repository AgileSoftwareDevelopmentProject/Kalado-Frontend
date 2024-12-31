import { sendRequest } from '../axiosInstance';
import { PRODUCT } from '../urls';

export async function getProductsByCategory(category: string, token: string) {
    try {
        const response = await sendRequest(
            `${PRODUCT.CREATE}/category/${category}`,
            'GET',
            {Authorization: `Bearer ${token}`}
        );

        if (response.isSuccess) {
            console.log('Products by category retrieved successfully!');
            return response.data;
        } else {
            console.log(response.message || 'Failed to retrieve products by category.');
        }

        return response;
    } catch (error) {
        console.error('An unexpected error occurred while retrieving products by category.', error);
        return { isSuccess: false, message: 'An error occurred while retrieving products by category.' };
    }
}

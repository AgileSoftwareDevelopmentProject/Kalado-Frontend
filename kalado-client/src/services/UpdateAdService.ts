import { sendRequest } from '../axiosInstance';
import { PRODUCT } from '../urls';

export async function updateAd(
    id: number, // for the ad to update
    title: string,
    priceAmount: number,
    category: string,
    date: string,
    description: string,
    // images: string[],
    // status: string
    // productionYear: number,
) {

    const payload = {
        title,
        price: {
            amount: priceAmount,
            unit: 'TOMAN',
        },
        category,
        date,
        description,
        // images,
        // status,
        productionYear: 2024,
    };

    try {
        const response = await sendRequest<typeof payload>(`${PRODUCT.UPDATE}/${id}`, 'PUT', payload);

        if (response.isSuccess) {
            console.log('Ad updated successfully!');
        } else if (response.status === 400) {
            console.log('Bad Request. Please check the input data.');
        } else {
            console.log(response.message || 'Ad update failed.');
        }

        return response;
    } catch (error) {
        console.error('An unexpected error occurred during ad update.', error);
        return { isSuccess: false, message: 'An error occurred during ad update.' };
    }
}

import { sendRequest } from '../axiosInstance';
import { PRODUCT } from '../urls';

export async function createAd(
    title: string,
    description: string,
    priceAmount: number,
    category: string,
    productionYear: number,
    brand: string,
    sellerId: number,
    token: string // Add token parameter
) {
    const payload = {
        title,
        description,
        price: {
            amount: priceAmount,
            unit: 'TOMAN', // Example unit
        },
        category,
        productionYear,
        brand,
        sellerId,
    };

    try {
        const headers = {
            Authorization: `Bearer ${token}`, 
        };

        const response = await sendRequest<typeof payload>(PRODUCT.CREATE, 'POST', payload, headers);

        console.log('Response:', response);

        if (response.isSuccess) {
            console.log('Ad created successfully!');
        } else if (response.status === 400) {
            console.log('Bad Request. Please check the input data.');
        } else {
            console.log(response.message || 'Ad creation failed.');
        }

        return response;
    } catch (error) {
        console.error('An unexpected error occurred during ad creation.', error);
        return { isSuccess: false, message: 'An error occurred during ad creation.' };
    }
}

// import axios from 'axios';

// interface AdData {
//     title: string;
//     price: number;
//     category: string | null;
//     description: string;
//     images: string;
// }

// export const createAd = async (adData: AdData): Promise<any> => {
//     try {
//         const response = await axios.post('https://kaladoshop.com/v1/create-ad', adData);
//         return response.data;
//     } catch (error) {
//         console.error('Create Ad error:', error);
//         throw new Error('Failed to create ad. Please try again.');
//     }
// };

import { sendRequest } from '../axiosInstance';
import { AUTH, PRODUCT } from '../urls';

export async function createAd(
    title: string,
    description: string,
    priceAmount: number,
    category: string,
    productionYear: number,
    // brand: string,
    sellerId: number
) {

    const payload = {
        title,
        description,
        price: {
            amount: priceAmount, 
            unit: 'TOMAN',      
        },
        category,
        productionYear,
        // brand,
        sellerId,
    };

    try {

        const response = await sendRequest<typeof payload>(PRODUCT.CREATE, 'POST', payload);

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

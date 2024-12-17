import axios from 'axios';

interface AdData {
    title: string;
    price: number;
    category: string | null;
    description: string;
    images: string;
}

export const createAd = async (adData: AdData): Promise<any> => {
    try {
        const response = await axios.post('https://kaladoshop.com/v1/create-ad', adData);
        return response.data;
    } catch (error) {
        console.error('Create Ad error:', error);
        throw new Error('Failed to create ad. Please try again.');
    }
};

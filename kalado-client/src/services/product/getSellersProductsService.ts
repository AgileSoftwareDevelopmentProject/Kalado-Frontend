import { sendRequest } from '../../axiosInstance';
import { PRODUCT } from '../../urls';

export async function getSellersProducts(sellerId: number, token: string) {
    try {
        const response = await sendRequest(
            `${PRODUCT.CREATE}/seller/${sellerId}`,
            'GET',
            { Authorization: `Bearer ${token}`}
        );

        if (response.isSuccess) {
            console.log("Seller's products retrieved successfully!");
            return response.data;
        } else {
            console.log(response.message || "Failed to retrieve seller's products.");
        }

        return response;
    } catch (error) {
        console.error("An unexpected error occurred while retrieving seller's products.", error);
        return { isSuccess: false, message: "An error occurred while retrieving seller's products." };
    }
}

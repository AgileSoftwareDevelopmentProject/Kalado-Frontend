import { ProductData, TProductResponseType } from '../../utils/apiTypes';
import { sendRequest } from './axiosInstance';
import { PRODUCT } from './urls';
import { useAuth } from '../../contexts/AuthContext';
import mockData from '../../mockData.json';  // use for mocking APIs


export async function createProductWithImages(productData: ProductData, imageFiles: File[], token: string | null) {
    const formData = new FormData();
    formData.append('product', JSON.stringify(productData));

    imageFiles.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
    });
    console.log(formData);
    return sendRequest<TProductResponseType>(
        PRODUCT.CREATE,
        'POST',
        formData,
        undefined,
        {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        }
    );
}

export async function deleteAd(adId: number) {
    const { token } = useAuth();
    return sendRequest(
        PRODUCT.DELETE(adId),
        'PUT',
        undefined,
        undefined,
        {
            Authorization: `Bearer ${token}`,
        }
    );
}

export async function updateAd(productId: number, productData: ProductData) {
    const { token } = useAuth();
    return sendRequest<TProductResponseType>(
        PRODUCT.UPDATE(productId),
        'PUT',
        productData,
        undefined,
        {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    );
}

export async function updateAdStatus(productId: number, status: string, token: string | null) {
    return sendRequest<TProductResponseType>(
        PRODUCT.UPDATE_STATUS(productId),
        'PUT',
        { status },
        undefined,
        {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    );
}

export async function getSingleProduct(adId: number) {
    return sendRequest<TProductResponseType>(
        PRODUCT.GET_SINGLE(adId),
        'GET',
        undefined,
        undefined
    );
}

// Use it like the following:
// const res = response.data as TProductResponseType[]
// setProducts(res)
export async function getProductsByCategory(category: string): Promise<TProductResponseType[]> {
    try {
        const response = await sendRequest(
            PRODUCT.GET_BY_CATEGORY(category),
            'GET',
            undefined,
            undefined
        );
        return response.data as TProductResponseType[];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Use it like the following:
// const res = response.data as TProductResponseType[]
// setProducts(res)
export async function getSellersProducts(): Promise<TProductResponseType[]> {
    try {
        const { token } = useAuth();
        const response = await sendRequest(
            PRODUCT.GET_BY_SELLER,
            'GET',
            undefined,
            undefined,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        return response.data as TProductResponseType[];
    } catch (error) {
        console.error('Error fetching seller’s products:', error);
        return [];
    }
}



// **************** Mock Functions ****************
// export const getSingleProduct = async (itemId: number) => {
//     return new Promise((resolve, reject) => {
//         const item = mockData.items.find(product => product.id === String(itemId));
//         if (item) {
//             resolve(item);
//         } else {
//             reject(new Error('Item not found'));
//         }
//     });
// };

// export const getProductsByCategory = async (category) => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(mockData.items);
//         }, 1000);
//     });
// };
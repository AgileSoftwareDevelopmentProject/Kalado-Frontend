import { ProductData, TProductResponseType } from '../../utils/apiTypes';
import { sendRequest } from './axiosInstance';
import { PRODUCT } from './urls';
import { useAuth } from '../../contexts/AuthContext';


export async function createAd(productData: ProductData) {
    const { token } = useAuth();
    return sendRequest<TProductResponseType>(
        PRODUCT.CREATE,
        'POST',
        productData,
        undefined,
        {
            'Content-Type': 'application/json',
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

export async function updateAdStatus(productId: number, status: string) {
    const { token } = useAuth();
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
    const { token } = useAuth();
    return sendRequest<TProductResponseType>(
        PRODUCT.GET_SINGLE(adId),
        'GET',
        undefined,
        undefined,
        {
            Authorization: `Bearer ${token}`,
        }
    );
}

// Use it like the following:
// const res = response.data as TProductResponseType[]
// setProducts(res)
export async function getProductsByCategory(category: string) {
    return sendRequest(
        PRODUCT.GET_BY_CATEGORY(category),
        'GET',
        undefined,
        undefined
    );
}

// Use it like the following:
// const res = response.data as TProductResponseType[]
// setProducts(res)
export async function getSellersProducts() {
    const { token } = useAuth();
    return sendRequest(
        PRODUCT.GET_BY_SELLER,
        'GET',
        undefined,
        undefined,
        {
            Authorization: `Bearer ${token}`,
        }
    );
}




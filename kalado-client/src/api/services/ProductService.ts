import { ProductData } from '../../utils/apiTypes';
import { sendRequest } from './axiosInstance';
import { PRODUCT } from './urls';


export async function createAd(token: string, productData: ProductData) {
    return sendRequest(
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

export async function deleteAd(token: string, adId: number) {
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

export async function updateAd(token: string, productId: number, productData: ProductData) {
    return sendRequest(
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

export async function updateAdStatus(token: string, productId: number, status: string) {
    return sendRequest(
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


export async function getSingleProduct(token: string, adId: number) {
    return sendRequest(
        PRODUCT.GET_SINGLE(adId),
        'PUT',
        undefined, 
        undefined, 
        {
            Authorization: `Bearer ${token}`, 
        }
    );
}

export async function getProductsByCategory(category: string) {
    return sendRequest(
        PRODUCT.GET_BY_CATEGORY(category), 
        'GET', 
        undefined, 
        undefined 
    );
}


export async function getSellersProducts(token: string) {
    return sendRequest(
        PRODUCT.GET_BY_SELLER,
        'PUT',
        undefined, 
        undefined, 
        {
            Authorization: `Bearer ${token}`, 
        }
    );
}




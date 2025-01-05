import { sendRequest } from './axiosInstance';
import { SEARCH } from './urls';
import { SortOrder } from '../../utils/types';
import { PageableResponseType, TProductResponseType } from '../../utils/apiTypes';


export async function getSearchByKeyword(token: string, keyword: string) {
    return sendRequest<PageableResponseType<TProductResponseType>>(
        SEARCH.BY_KEYWORD(keyword),
        'GET',
        undefined, 
        undefined, 
        {
            Authorization: `Bearer ${token}`, 
        }
    );
}

export async function getSearchByPriceRange(token: string, minPrice: number, maxPrice: number) {
    return sendRequest<PageableResponseType<TProductResponseType>>(
        SEARCH.BY_PRICE_RANGE(minPrice, maxPrice),
        'GET',
        undefined, 
        undefined, 
        {
            Authorization: `Bearer ${token}`, 
        }
    );
}

export async function getSearchByBrandWithSorting(token: string, keyword: string, sortBy: string, sortOrder: SortOrder) {
    return sendRequest<PageableResponseType<TProductResponseType>>(
        SEARCH.BY_KEYWORD_SORTED(keyword, sortBy, sortOrder),
        'GET',
        undefined, 
        undefined, 
        {
            Authorization: `Bearer ${token}`, 
        }
    );
}

export async function getSearchByMultipleFilters(token: string, keyword: string, minPrice: number, maxPrice: number, timeFilter: string) {
    return sendRequest<PageableResponseType<TProductResponseType>>(
        SEARCH.FILTERED(keyword, minPrice, maxPrice, timeFilter),
        'GET',
        undefined, 
        undefined, 
        {
            Authorization: `Bearer ${token}`, 
        }
    );
}

export async function getPaginatedSearch(token: string, page: number, size: number) {
    return sendRequest<PageableResponseType<TProductResponseType>>(
        SEARCH.PAGINATED(page, size),
        'GET',
        undefined, 
        undefined, 
        {
            Authorization: `Bearer ${token}`, 
        }
    );
}
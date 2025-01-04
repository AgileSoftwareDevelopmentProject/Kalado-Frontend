import { sendRequest } from './axiosInstance';
import { SEARCH } from './urls';
import { SortOrder } from '../../utils/types';


export async function getSearchByKeyword(token: string, keyword: string) {
    return sendRequest(
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
    return sendRequest(
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
    return sendRequest(
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
    return sendRequest(
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
    return sendRequest(
        SEARCH.PAGINATED(page, size),
        'GET',
        undefined, 
        undefined, 
        {
            Authorization: `Bearer ${token}`, 
        }
    );
}
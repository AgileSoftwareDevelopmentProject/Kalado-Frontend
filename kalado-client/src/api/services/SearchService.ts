import { sendRequest } from './axiosInstance';
import { SEARCH } from './urls';
import { SortOrder } from '../../constants/types';
import { PageableResponseType, TProductResponseType } from '../../constants/apiTypes';


export async function getSearchByKeyword(keyword: string) {
    return sendRequest<PageableResponseType<TProductResponseType>>(
        SEARCH.BY_KEYWORD(keyword),
        'GET',
        undefined,
        undefined,
        {
            'Content-Type': 'application/json',
        }
    );
}

export async function getSearchByPriceRange(minPrice: number, maxPrice: number) {
    return sendRequest<PageableResponseType<TProductResponseType>>(
        SEARCH.BY_PRICE_RANGE(minPrice, maxPrice),
        'GET',
        undefined,
        undefined,
        {
            'Content-Type': 'application/json',
        }
    );
}

export async function getSearchByBrandWithSorting(keyword: string, sortBy: string, sortOrder: SortOrder) {
    return sendRequest<PageableResponseType<TProductResponseType>>(
        SEARCH.BY_KEYWORD_SORTED(keyword, sortBy, sortOrder),
        'GET',
        undefined,
        undefined,
        {
            'Content-Type': 'application/json',
        }
    );
}

export async function getSearchByMultipleFilters(keyword: string | '', minPrice: number | 0, maxPrice: number | 0, timeFilter: string | '') {
    console.log(keyword, minPrice, maxPrice, timeFilter);
    return sendRequest<PageableResponseType<TProductResponseType>>(
        SEARCH.FILTERED(keyword, minPrice, maxPrice, timeFilter),
        'GET',
        undefined,
        undefined,
        {
            'Content-Type': 'application/json',
        }
    );
}

export async function getPaginatedSearch(page: number, size: number) {
    return sendRequest<PageableResponseType<TProductResponseType>>(
        SEARCH.PAGINATED(page, size),
        'GET',
        undefined,
        undefined,
        {
            'Content-Type': 'application/json',
        }
    );
}
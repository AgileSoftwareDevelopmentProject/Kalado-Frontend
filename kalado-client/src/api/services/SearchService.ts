import { sendRequest } from './axiosInstance';
import { SEARCH } from './urls';
import { SortOrder } from '../../utils/types';
import { PageableResponseType, TProductResponseType } from '../../utils/apiTypes';
import { useAuth } from '../../contexts/AuthContext';


export async function getSearchByKeyword(keyword: string) {
    const { token } = useAuth();
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

export async function getSearchByPriceRange(minPrice: number, maxPrice: number) {
    const { token } = useAuth();
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

export async function getSearchByBrandWithSorting(keyword: string, sortBy: string, sortOrder: SortOrder) {
    const { token } = useAuth();
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

export async function getSearchByMultipleFilters(keyword: string, minPrice: number, maxPrice: number, timeFilter: string) {
    const { token } = useAuth();
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

export async function getPaginatedSearch(page: number, size: number) {
    const { token } = useAuth();
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
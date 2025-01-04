export const BASE_URL = 'http://kaladoshop.com:8083/v1';

// AUTH
export const AUTH = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    VERIFY: '/auth/verify',
};

// PRODUCT
export const PRODUCT = {
    CREATE: '/product',
    UPDATE: (productId: number) => `/product/${productId}`,
    DELETE: (productId: number) => `/product/delete/${productId}`,
    UPDATE_STATUS: (productId: number) => `/product/status/${productId}`,
    GET_BY_SELLER: '/product/seller', 
    GET_BY_CATEGORY: (category: string) => `/product/category/${category}`, 
    GET_SINGLE: (productId: number) => `/product/${productId}`, 
};


// REPORT
export const REPORT = {
    CREATE: '/reports',
    UPDATE_STATUS: (reportId: string) => `/reports/admin/status${reportId}`,
    GET_MY_REPORTS: `/reports/my-reports`, 
    GET_ALL_REPORTS: `/reports/admin/all`,
    GET_REPORT_STATISTICS: (startDate: string, endDate: string) => 
        `/reports/admin/statistics?startDate=${startDate}&endDate=${endDate}`,
};

// USER
export const USER = {
    GET: '/user',
    PUT: '/user',
};

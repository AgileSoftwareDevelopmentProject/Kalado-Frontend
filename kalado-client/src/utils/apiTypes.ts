import { User, UserType } from '../utils/types'


// Login
export interface LoginRequest {
    email: string;
    password: string;
}

export type TLoginResponseType = {
    token: string
    role: UserType
}

// Register
export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: string;
}

export interface RegisterResponse {
    success: boolean;
    message?: string;
}

// Code Verify
export interface CodeVerifyRequest {
    token: string;
}

export interface CodeVerifyResponse {
    success: boolean;
    message?: string;
}



// Product
export interface ProductData {
    title: string;
    description: string;
    price: {
        amount: number;
        unit: string;
    };
    category: string;
    // images?: File[] | null;
    productionYear?: number | null;
    brand?: string | null;
    // sellerId: number;
}

export type TProductResponseType = {
    id: number;
    title: string;
    description: string;
    price: {
        amount: number;
        unit: string;
    };
    imageUrls: string[];   // contains urls
    category: string;
    productionYear: number;
    brand: string;
    status: string;
    createdAt: number; // Timestamp in milliseconds
    sellerId: number;
};



// Report
export interface ReportData {
    violationType: string;
    description: string;
    reportedUserId: number;
    reportedContentId: number;
}

export interface ReportStatusUpdateData {
    status: string;
    adminNotes: string;
    blockUser: boolean;
    blockReason: string | null;
}


// User
export interface ProfileData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
}

export type TUserProfileResponse = {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    address: string | null;
    phoneNumber: string;
};



// Search

export type PageableResponseType<T> = {
    content: T[];
    pageable: {
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        offset: number;
        pageNumber: number;
        pageSize: number;
        unpaged: boolean;
        paged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
};

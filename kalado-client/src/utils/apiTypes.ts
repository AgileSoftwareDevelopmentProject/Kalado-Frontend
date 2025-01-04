import { User , UserType} from '../utils/types'


// Login
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    token: string;
    role: string
}

// Register
export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    passwordRepeat: string;
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
    productionYear: number;
    brand: string;
    // sellerId: number;
}




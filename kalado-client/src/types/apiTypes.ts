export interface Product {
    id: number;
    title: string;
    createdAt: string;
    imageUrls?: string[];
    price: {
        amount: number,
        unit: string,
    },
    description?: string;
    seller_phone?: string;
    sellerId: number;
    brand?: string;
    productionYear?: string;
}
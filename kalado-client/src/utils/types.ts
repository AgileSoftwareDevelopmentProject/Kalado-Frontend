

export type UserType = 'USER' | 'ADMIN'
export type SortOrder = 'ASC' | 'DESC'
export type ReportStatus = 'PREPARING' 
export type AdType = 'PREPARING' 


export type User = {
    id: number
    address?: string
    first_name: string
    last_name: string
    username?: string
    phone_number: string
    restaurant_name?: string
}

export type Price = {
    amount: number
    unit: string
}


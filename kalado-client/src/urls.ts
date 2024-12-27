export const BASE_URL = 'https://dishdash.mmmirzaei.info/v1' // 'http://91.107.129.255:8083/v1'

// AUTH
export const AUTH = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
}

// ORDERS

// USER - CUSTOMER
export const CUSTOMER_ORDER = {
    GET_ALL_RESTAURANTS: `/restaurantOwner/all`,
    GET_RESTAURANT: (restaurantId: string) => `/customer/restaurant?restaurantId=${restaurantId}`,
    GET_SHOPPING_CARTS: `shoppingCart/customer/customerShoppingCarts`,
    CREATE_SHOPPING_CART: (restaurantOwnerId: string) => `/shoppingCart/customer/${restaurantOwnerId}`,
    MODIFY_SHOPPING_CART: (shoppingCartId: string) => `/shoppingCart/customer/modifyShoppingCart?orderId=${shoppingCartId}`,
    CREATE_ORDER: (restaurantOwnerId: string) => `/order/customer?restaurantOwnerId=${restaurantOwnerId}`,
    MODIFY_ORDER: (orderId: string) => `/order/customer/modifyOrder?orderId=${orderId}`,
    GET_CUSTOMER_ORDERS: `/order/customer/customerOrders`,
    GET_CUSTOMER_CURRENT_ORDER: `/order/customer/current`,
}

// USER - RESTAURANT OWNER
export const RESTAURANT_OWNER_ORDER = {
    UPDATE_ORDER_STATUS: (orderId: string, status: string) =>
        `/order/restaurantOwner/status?orderId=${orderId}&status=${status}`,
    GET_ORDERS: `/order/restaurantOwner/orderHistory`,
    GET_ACTIVE_ORDERS: `/order/restaurantOwner/activeOrders`,
}

// USER - DELIVERY PERSON
export const DELIVERY_PERSON_ORDER = {
    UPDATE_ORDER_STATUS: (orderId: string, status: string) =>
        `/order/deliveryPerson/status?orderId=${orderId}&status=${status}`,
    GET_CURRENT_ORDER: `/order/deliveryPerson/current`,
}

// REVIEW
export const REVIEW = {
    SET_ORDER_REVIEW: (orderId: string, comment: string) => `/review/order?orderId=${orderId}&comment=${comment}`,
}

// RATE
export const RATE = {
    SET_ORDER_RATE: (orderId: string, point: number) => `/rate/order?orderId=${orderId}&point=${point}`,
    SET_DELIVERY_PERSON_RATE: (orderId: string, point: number) => `/rate/delivery?orderId=${orderId}&point=${point}`,
}

// DELIVERY
export const DELIVERY = {
    GET_INVOICE: (orderId: string) => `/delivery/getInvoice?orderId=${orderId}`,
}

// PRODUCTS

// CATEGORY
export const CATEGORY = {
    GET_ALL: `/category`,
    GET_BY_ID: (categoryId: string) => `/category/${categoryId}`,
    CREATE: `/category`,
    DELETE: (categoryId: string) => `/category/${categoryId}`,
}

// FOOD
export const FOOD = {
    GET_ALL: `/food`,
    GET_BY_ID: (foodId: string) => `/food/${foodId}`,
    CUSTOMER_GET_BY_ID: (foodId: string) => `/customer/food/${foodId}`,
    CREATE: `/food`,
    EDIT: (foodId: string) => `/food/${foodId}`,
    DELETE: (foodId: string) => `/food/${foodId}`,
}

// MENU
export const MENU = {
    GET_ALL: `/menu`,
    GET_BY_RESTAURANT_ID: (restaurantId: string) => `/menu/${restaurantId}`,
    CREATE: `/menu`,
    DELETE: (menuId: string) => `/menu/${menuId}`,
}

// USER - CUSTOMER
export const CUSTOMER = {
    MODIFY: `/customer`,
    GET: `/customer`,
}

// USER - RESTAURANT OWNER
export const RESTAURANT_OWNER = {
    MODIFY: `/restaurantOwner`,
    GET: `/restaurantOwner`,
}

// USER - DELIVERY PERSON
export const DELIVERY_PERSON = {
    MODIFY: `/deliveryPerson`,
    GET: `/deliveryPerson`,
    GET_STATUS: `/deliveryPerson/status`,
    SET_LOCATION: `/deliveryPerson/location`,
    GET_LOCATION: `/deliveryPerson/location`,
}

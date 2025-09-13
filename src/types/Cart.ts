export interface ShoppingCart {
    userId: string | null,
    guestId : string | null,
    shoppingCartItem: ShoppingCartItem
}
export interface ShoppingCartItem{
    productId: string,
    productName: string,
    price: number,
    quantity: number,
    imageUrl: string
}
export interface ShoppingCartRequestWrapper {
    shoppingCartItem : ShoppingCartItem
}
export interface ShoppingCartResponseWrapper{
    cart: ShoppingCartResponse
}
export interface ShoppingCartResponse{
    userId: string | null,
    guestId: string | null,
    totalPrice: number,
    items: ShoppingCartItem[]
}
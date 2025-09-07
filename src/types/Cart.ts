export interface ShoppingCart {
    userId: string,
    shoppingCartItem: ShoppingCartItem
}
export interface ShoppingCartItem{
    productId: string,
    productName: string,
    price: number,
    quantity: number,
    imageUrl: string
}
export interface ShoppingCartResponseWrapper{
    cart: ShoppingCartResponse
}
export interface ShoppingCartResponse{
    userId: string,
    totalPrice: number,
    items: ShoppingCartItem[]
}
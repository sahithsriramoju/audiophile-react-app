import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export class CartItem{
    productId : string;
    quantity : number;
    /**
     *
     */
    constructor(productId:string, quantity:number) {
      this.productId = productId;
      this.quantity = quantity;
    }
}

const cartItems: CartItem[] = []

const cartSlice = createSlice({
    name:'cart',
    initialState :{
        cartItems : cartItems,
        isCartOpen : false
    },
    reducers :{
        toggleCart : (state) => {
            state.isCartOpen = !state.isCartOpen
        },
        openCart : (state) => {
            state.isCartOpen = true
        },
        closeCart: (state) => {
            state.isCartOpen = false
        },
        clearCart : (state) => {
            state.cartItems = []
        },
        removeItem : (state, action: PayloadAction<CartItem>) => {
            const itemIndex = state.cartItems.findIndex(x=>x.productId == action.payload.productId);
            if(itemIndex > -1)
                state.cartItems.splice(itemIndex, 1)
        },
        incrementQuantity : (state, action: PayloadAction<CartItem>) => {
            const item = state.cartItems.find(x=>x.productId == action.payload.productId);
            if(item === undefined)
                state.cartItems.push(action.payload)
            else
                item.quantity += 1
        },
        decrementQuantity : (state, action: PayloadAction<CartItem>) => {
            const item = state.cartItems.find(x=>x.productId == action.payload.productId);
            const itemIndex = state.cartItems.findIndex(x=>x.productId == action.payload.productId);
            if(item?.quantity === 1)
                state.cartItems.splice(itemIndex,1)
            else
                item!.quantity -= 1
        }
    }
})
export const {removeItem, incrementQuantity, decrementQuantity, clearCart, openCart, closeCart, toggleCart} = cartSlice.actions;
export default cartSlice.reducer;

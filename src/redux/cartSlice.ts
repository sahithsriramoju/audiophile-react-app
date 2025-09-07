import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { ShoppingCart, ShoppingCartResponseWrapper, ShoppingCartItem } from "../types/Cart";
import type { RootState } from "./appStore";

const cart: ShoppingCartResponseWrapper = { 
    cart: {
        userId: '',
        totalPrice: 0,
        items: []
    }
}
export const addOrUpdateCart = createAsyncThunk("/api/cart/createCart",async(cart: ShoppingCart) => {
    const response = await axios.post("https://audiophile-cart-service.azurewebsites.net/api/cart",cart);
    console.log(response.data);
    return response.data;
});
export const fetchCart = createAsyncThunk("/api/cart/fetchCart", async() => {
    const response = await axios.get("https://audiophile-cart-service.azurewebsites.net/api/cart/1");
    console.log(response.data);
    return response.data;
});
export const deleteCart = createAsyncThunk("/api/cart/deleteCart",async() => {
    const response = await axios.delete("https://audiophile-cart-service.azurewebsites.net/api/cart/1");
    console.log(response.data);
    return response.data;
});

const cartSlice = createSlice({
    name:'cart',
    initialState :{
        cart : cart,
        isCartOpen : false,
        status: 'idle',
        errors: [] as string[]
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
            state.cart.cart.items = []
        },
        removeItem : (state, action: PayloadAction<ShoppingCartItem>) => {
            const itemIndex = state.cart.cart.items.findIndex((x: any)=>x.productId == action.payload.productId);
            if(itemIndex > -1)
                state.cart.cart.items.splice(itemIndex, 1)
        },
        incrementQuantity : (state, action: PayloadAction<ShoppingCartItem>) => {
            const item = state.cart.cart.items.find((x: any)=>x.productId == action.payload.productId);
            if(item === undefined)
                state.cart.cart.items.push(action.payload as any)
            else
                item.quantity += 1
        },
        decrementQuantity : (state, action: PayloadAction<ShoppingCartItem>) => {
            const item = state.cart.cart.items.find((x: ShoppingCartItem)=>x.productId == action.payload.productId);
            const itemIndex = state.cart.cart.items.findIndex((x: ShoppingCartItem)=>x.productId == action.payload.productId);
            if(item?.quantity === 1)
                state.cart.cart.items.splice(itemIndex,1)
            else
                item!.quantity -= 1
        }
    },
    extraReducers : (builder) =>{
        builder.addCase(addOrUpdateCart.pending, (state)=>{
            state.status = 'pending'
        })
        builder.addCase(addOrUpdateCart.fulfilled,(state,action:PayloadAction<ShoppingCartResponseWrapper>)=>{
            state.status = 'successful';
            state.cart.cart.totalPrice = action.payload.cart.totalPrice;
        })
        builder.addCase(addOrUpdateCart.rejected,(state, action)=>{
            state.status = 'failed'
            state.errors = action.error?.message ? [action.error.message] : ['Unknown error']
        })
        builder.addCase(fetchCart.fulfilled,(state,action:PayloadAction<ShoppingCartResponseWrapper>)=>{
            state.cart.cart = action.payload.cart;
            state.status = 'successful';
        })
        builder.addCase(fetchCart.pending,(state)=>{
            state.status = 'pending';
        })
        builder.addCase(fetchCart.rejected,(state,action)=>{
            state.status = 'failed'
            state.errors = action.error?.message ? [action.error.message] : ['Unknown error']
        })
        builder.addCase(deleteCart.fulfilled,(state,action) => {
            state.cart = cart
        })
        builder.addCase(deleteCart.rejected, (state,action) =>{
            state.errors = action.error?.message ? [action.error.message] : ['Unknown error']
        })

    }
})
export const {removeItem, incrementQuantity, decrementQuantity, clearCart, openCart, closeCart, toggleCart} = cartSlice.actions;
export default cartSlice.reducer;

export const getCart = (state:RootState) => state.cart.cart.cart
export const getCartStatus = (state:RootState) =>  state.cart.status
export const getCartErrors = (state:RootState) => state.cart.errors
export const getCartOpenStatus = (state:RootState) => state.cart.isCartOpen
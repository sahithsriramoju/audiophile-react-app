import {configureStore}  from "@reduxjs/toolkit";
import cartReducer  from "../redux/cartSlice";

export const appStore = configureStore({
    reducer : {
        cart : cartReducer
    }
});

type rootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch
export type RootState = ReturnType<typeof appStore.getState>

//export const errors = useSelector((state: rootState) => state.cart.errors);
//export const cart = useSelector((state:rootState)=>state.cart.cart.cart);
//export const cartStatus = useSelector((state:rootState) => state.cart.status);
//export const isCartOpen = useSelector((state:rootState) => state.cart.isCartOpen);
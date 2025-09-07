import {configureStore}  from "@reduxjs/toolkit";
import cartReducer  from "../redux/cartSlice";
import productReducer from "../redux/productsSlice";

export const appStore = configureStore({
    reducer : {
        cart : cartReducer,
        product: productReducer
    }
});


export type AppDispatch = typeof appStore.dispatch
export type RootState = ReturnType<typeof appStore.getState>


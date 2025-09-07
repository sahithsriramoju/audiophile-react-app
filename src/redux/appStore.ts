import {configureStore}  from "@reduxjs/toolkit";
import cartReducer  from "../redux/cartSlice";
import productReducer from "../redux/productsSlice";
import { apiSlice } from "./apiSlice";

export const appStore = configureStore({
    reducer : {
        cart : cartReducer,
        product: productReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware : (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)
});


export type AppDispatch = typeof appStore.dispatch
export type RootState = ReturnType<typeof appStore.getState>


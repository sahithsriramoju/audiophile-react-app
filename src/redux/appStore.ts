import {configureStore}  from "@reduxjs/toolkit";
import cartReducer  from "../redux/cartSlice";

export const appStore = configureStore({
    reducer : {
        cart : cartReducer
    }
});

export type AppDispatch = typeof appStore.dispatch
export type RootState = ReturnType<typeof appStore.getState>
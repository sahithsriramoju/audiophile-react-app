import { createAsyncThunk, createEntityAdapter, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product, ProductByIdResponse, ProductsByCategoryResponse } from "../types/Product";
import axios from "axios";
import type { RootState } from "./appStore";

export const productAdapter = createEntityAdapter<Product>({
    sortComparer: (a:Product,b:Product) => Number(b.new) - Number(a.new),
})
const initialState = productAdapter.getInitialState({
    status: 'idle', //'pending' | 'successful' | 'failed'
    error : ''
});

export const fetchProductsByCategory = createAsyncThunk<ProductsByCategoryResponse, string>(
    "/api/products/category",
    async (category, thunkAPI) => {
        const response = await axios.get<ProductsByCategoryResponse>(
            `https://audiophile-product-catalog.azurewebsites.net/api/product/category/${category}`,
            { signal: thunkAPI.signal }
        );
        return response.data;
    }
)
export const fetchProductById = createAsyncThunk<ProductByIdResponse, string>(
    "/api/product/id",
    async (productId, thunkAPI) => {
        const response = await axios.get<ProductByIdResponse>(
            `https://audiophile-product-catalog.azurewebsites.net/api/product/${productId}`,
            { signal: thunkAPI.signal }
        );
        return response.data;
    }
)
export const productSlice = createSlice({
    name:"product",
    initialState,
    reducers: {
       
    },
    extraReducers : (builder) => {
        builder.addCase(fetchProductsByCategory.pending, (state) => {
            state.status = 'pending';
        })
        builder.addCase(fetchProductsByCategory.fulfilled,(state,action:PayloadAction<ProductsByCategoryResponse>) => {
            state.status = 'successful';
            productAdapter.upsertMany(state,action.payload.products);
        })
        builder.addCase(fetchProductsByCategory.rejected,(state,action)=>{
            state.status = 'failed';
            state.error = action.error.message??'Unknown error'
        })
    }
})
export const {
    selectAll : getProducts,
    selectById : getProductById,
} = productAdapter.getSelectors((state:RootState) => state.product);


export default productSlice.reducer;
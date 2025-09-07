import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductByIdResponse,  ProductsByCategoryResponse } from "../types/Product";

export const apiSlice = createApi({
    reducerPath : 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://audiophile-product-catalog.azurewebsites.net/api'}),
    endpoints: (builder) => ({
        getProductsByCategory : builder.query<ProductsByCategoryResponse,string>({
            query: (category) => `/product/category/${category}`
        }),
        getProductById: builder.query<ProductByIdResponse,string>({
            query: (id) => `/product/${id}`
        })
    })
})

export const {
    useGetProductsByCategoryQuery,
    useGetProductByIdQuery
} = apiSlice
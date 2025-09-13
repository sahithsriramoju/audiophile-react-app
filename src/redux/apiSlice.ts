import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath : 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://audiophile-product-catalog.azurewebsites.net/api',
        prepareHeaders: (headers, { getState, endpoint }) => {
            const state = getState() as { user?: { token?: string } };
            const token = state.user?.token;
            if(token){
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    
    endpoints: (builder) => ({
    }),
    tagTypes: ['Cart'],
    keepUnusedDataFor: 86400
})


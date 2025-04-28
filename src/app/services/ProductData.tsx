import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define types for Product and NewProduct
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface NewProduct {
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export const productsApi = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
    endpoints: (builder) => ({
        // Get all products
        getAllProduct: builder.query<{ products: Product[], total: number }, { limit: number, skip: number }>({
            query: ({ limit, skip }) => `/products?limit=${limit}&skip=${skip}`,
        }),

        // Get a specific product by ID
        getSingleProduct: builder.query<Product, number>({
            query: (id) => `/products/${id}`,
        }),

        // Add a new product
        addNewProduct: builder.mutation<Product, NewProduct>({
            query: (newProduct) => ({
                url: `products/add`,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: newProduct,
            }),
        }),

        // Update a product
        updateProduct: builder.mutation<Product, { id: number; updatedProduct: Partial<NewProduct> }>({
            query: ({ id, updatedProduct }) => ({
                url: `products/${id}`,
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: updatedProduct,
            }),
        }),
    }),
});

// Export hooks
export const {
    useGetAllProductQuery,
    useGetSingleProductQuery,
    useAddNewProductMutation,
    useUpdateProductMutation,
} = productsApi;

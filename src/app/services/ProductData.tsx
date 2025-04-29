import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define types for Category, Product and NewProduct
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    availabilityStatus: string;
    tags: string[];
    rating: number;
    stock: number;
    brand: string;
    category: string;
    reviews: string[];
    thumbnail: string;
    images: string[];
}

export interface NewProduct {
    title: string;
    description: string;
    price: number;
    availabilityStatus: string;
    tags: string[];
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    reviews: string[];
    thumbnail: string;
    images: string[];
}

export interface Category {
    slug: string;
    name: string;
    url: string;
}

export const productsApi = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
    endpoints: (builder) => ({
        // Get all products
        getAllProduct: builder.query<{ products: Product[], total: number }, { limit: number, skip: number }>({
            query: ({ limit, skip }) => `/products?limit=${limit}&skip=${skip}`,
        }),

        //Get all products Category 
        getAllProductCategories: builder.query<Category[], void>({
            query: () => '/products/categories',
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
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: updatedProduct,
            }),
        }),
    }),
});

// Export hooks
export const {
    useGetAllProductQuery,
    useGetAllProductCategoriesQuery,
    useGetSingleProductQuery,
    useAddNewProductMutation,
    useUpdateProductMutation,
} = productsApi;

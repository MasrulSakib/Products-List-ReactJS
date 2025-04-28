import { createBrowserRouter } from "react-router";
import ProductDetails from "../productDetails/ProductDetails";
import ProductsList from "../productsList/ProductsList";
import Root from "../root/Root";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
    },
    {
        path: "products",
        element: <ProductsList />,
    },
    {
        path: "products/:id",
        element: <ProductDetails />,
    },
]);

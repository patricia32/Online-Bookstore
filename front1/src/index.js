import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import "./index.css";
import App from "./App.js";
import LoginPage from "./LoginPage";
import AboutUser from "./pages/AboutUser";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ProductPage from "./pages/ProductPage"
import Favorites from "./pages/Favorites"
import Login from "./pages/Login";
import HomeUser from "./pages/HomeUser";
import Cart from "./pages/Cart";
import ProductPageGuest from "./pages/ProductPageGuest";
import HomeAdmin from "./pages/HomeAdmin";
import ProductEdit from "./pages/ProductEdit";
import AddProductPage from "./pages/AddProductPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/auth/product/:idProduct",
        element: <ProductPage />,
    },
    {
        path: "/auth/login",
        element: <Login />,
    },
    {
        path: "/auth/aboutUser",
        element: <AboutUser />,
    },
    {
        path: "/auth/register",
        element: <Register />,
    },
    {
        path: "/auth/homeUser",
        element: <HomeUser />,
    },
    {
        path: "/auth/cart",
        element: <Cart />,
    },
    {
        path: "/auth/favorites",
        element: <Favorites />,
    },
    {
        path: "/auth/product",
        element: <ProductPage />,
    },
    {
        path: "/productGuest",
        element: <ProductPageGuest />,
    },
    {
        path: "/admin/homepage",
        element: <HomeAdmin />,
    },
    {
        path: "/admin/productEdit",
        element: <ProductEdit />,
    },
    {
        path: "/admin/addProductPage",
        element: <AddProductPage />,
    },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

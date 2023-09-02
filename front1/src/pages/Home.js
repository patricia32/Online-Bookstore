import React from 'react'
import Navbar from "../components/Navbar.js";
import Products from "../components/Products";
import ProductsGuest from "../components/ProductsGuest";

function Home(){
    localStorage.setItem("urlCrt", "http://localhost:3000")

    return(
        <div>
            <Navbar/>
            <ProductsGuest/>
        </div>
    )
}
export default Home
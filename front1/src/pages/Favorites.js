import React from 'react'
import NavbarUser from "../components/NavbarUser.js";
import FavsProducts from "../components/FavsProducts";

function Favorites(){
    return(
        <div>
            <NavbarUser/>
            <FavsProducts/>
        </div>
    )
}
export default Favorites
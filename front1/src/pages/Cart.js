import React from 'react'
import NavbarUser from "../components/NavbarUser.js";
import CartProducts from "../components/CartProducts";

function Cart(){
    return(
        <div>
            <NavbarUser/>
            <CartProducts/>
        </div>
    )
}
export default Cart
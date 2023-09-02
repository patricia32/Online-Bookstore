import React, {useEffect} from "react";
import {Delete, Favorite, ShoppingCart} from "@material-ui/icons";
import './Prod.css'
import './ProdCart.css'
import axiosInstance from "axios";
import {Button} from "@material-ui/core";
import NavbarUser from "./NavbarUser";
import Left from "./Left";
import Right from "./Right";
const ProdCart = ({item}) => {

    let idClient = JSON.parse(localStorage.getItem('id'));
    let language = localStorage.getItem("language");

    function deleteFromCart() {
            axiosInstance.delete("http://localhost:8081/auth/" + idClient + "/" + item.id)
                .then(window.location.replace("http://localhost:3000/auth/cart"))
    }

    if(language.localeCompare("ro") === 0) {
        return (
            <div className="ContainerCartProducts">
                <div className="wrapperCartProdPage">
                    <div className="leftProd">
                        <img className="imageCartProd" src={item.image}/>
                    </div>
                    <div className="rightProd">
                        <p className="TitleProd"><b>Titlu </b>{item.titleRo}<br/></p>
                        <p className="TitleProd"><b>Autor </b> {item.author.name}<br/></p>
                        <p><b>Preț </b> {item.price} lei</p>
                        <Button onClick={deleteFromCart}><Delete/></Button>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="ContainerCartProducts">
                <div className="wrapperCartProdPage">
                    <div className="leftProd">
                        <img className="imageCartProd" src={item.image}/>
                    </div>
                    <div className="rightProd">
                        <p className="TitleProd"><b>Title </b>{item.title}<br/></p>
                        <p className="TitleProd"><b>Author </b> {item.author.name}<br/></p>
                        <p><b>Price </b> {item.price} lei</p>
                        <Button onClick={deleteFromCart}><Delete/></Button>
                    </div>
                </div>
            </div>
        )
    }

}
export default ProdCart
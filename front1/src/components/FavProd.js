import React, {useEffect} from "react";
import {Delete, Favorite, ShoppingCart} from "@material-ui/icons";
import './Prod.css'
import './ProdCart.css'
import axiosInstance from "axios";
import {Button, Snackbar} from "@material-ui/core";
const ProdCart = ({item}) => {

    let idClient = JSON.parse(localStorage.getItem('id'));
    let language = localStorage.getItem("language");
    function deleteFromFavorites() {
        axiosInstance.delete("http://localhost:8081/deleteFromFavorites/" + idClient + "/" + item.id)
            .then(
                window.location.replace("http://localhost:3000/auth/favorites"))
    }

    if (language.localeCompare("ro") === 0) {
        return (
            <div>
                <div className="wrapperCartProdPage">
                    <div className="leftProd">
                        <img className="imageCartProd" src={item.image}/>
                    </div>
                    <div className="rightProd">
                        <p className="TitleProd"><b>Titlu </b>{item.titleRo}<br/></p>
                        <p className="TitleProd"><b>Autor </b> {item.author.name}<br/></p>
                        <p><b>Preț </b> {item.price} lei</p>
                        <Button onClick={deleteFromFavorites}><Delete/></Button>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div >
                <div className="wrapperCartProdPage">
                    <div className="leftProd">
                        <img className="imageCartProd" src={item.image}/>
                    </div>
                    <div className="rightProd">
                        <p className="TitleProd"><b>Title </b>{item.title}<br/></p>
                        <p className="TitleProd"><b>Author </b> {item.author.name}<br/></p>
                        <p><b>Price </b> {item.price} lei</p>
                        <Button onClick={deleteFromFavorites}><Delete/></Button>
                    </div>
                </div>
            </div>
        )
    }

}
export default ProdCart
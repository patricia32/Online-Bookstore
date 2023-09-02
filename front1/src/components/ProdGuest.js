import React, {useEffect} from "react";
import {Favorite, ShoppingCart} from "@material-ui/icons";
import './Prod.css'
import axiosInstance from "axios";
import {Link} from "@material-ui/core";
const ProdGuest = ({item}) => {
    let language = localStorage.getItem("language");
    function goToProduct() {
        localStorage.setItem("productId", item.id)
        localStorage.setItem("urlCrt", "http://localhost:3000/productGuest")
        window.location.replace("http://localhost:3000/productGuest")
    }
    if(language.localeCompare("ro") === 0) {
        return (
            <div>
                <div className="ContainerProd">
                    <div className="CircleProd">
                        <img className="ImageProd" src={item.image}/>
                    </div>
                </div>
                <div className="TitleProd" onClick={goToProduct}><b>{item.titleRo}</b><br/></div>
                <div className="TitleProd">{item.author.name}<br/></div>
                <div>{item.price} lei</div>
            </div>
        )
    }
    else{
        return (
            <div>
                <div className="ContainerProd">
                    <div className="CircleProd">
                        <img className="ImageProd" src={item.image}/>
                    </div>
                </div>
                <div className="TitleProd" onClick={goToProduct}><b>{item.title}</b><br/></div>
                <div className="TitleProd">{item.author.name}<br/></div>
                <div>{item.price} lei</div>
            </div>
        )
    }
}
export default ProdGuest
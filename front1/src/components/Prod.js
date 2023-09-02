import React, {useEffect} from "react";
import {Favorite, ShoppingCart} from "@material-ui/icons";
import './Prod.css'
import axiosInstance from "axios";
import '../components/history'
import {Snackbar} from "@material-ui/core";
import {Alert} from "@mui/material";

const Prod = ({item}) => {
    const [open, setOpen] = React.useState(false);
    const [openCart, setOpenCart] = React.useState(false);
    let idClient = JSON.parse(localStorage.getItem('id'));
    let language = localStorage.getItem("language");

    function addToCart() {
        setOpenCart(true);
           axiosInstance.put("http://localhost:8081/addToCart/" + idClient + "/" + item.id)
    }

    function addToFavorites(){
        setOpen(true);
        axiosInstance.put("http://localhost:8081/addToFavorites/"  + idClient + "/" + item.id)
    }
    function goToProduct() {
        localStorage.setItem("productId", item.id)
        localStorage.setItem("urlCrt", "http://localhost:3000/auth/product")
        window.location.replace("http://localhost:3000/auth/product")
    }
    if(language.localeCompare("ro") === 0) {
        return (
            <div>
                <Snackbar open={open} autoHideDuration={3000} onClose={(event, reason) => {
                    setOpen(false);
                }}>
                    <Alert severity="success" sx={{width: '100%'}}>
                        <b> {item.titleRo} </b> a fost adăugat în lista de produse favorite!
                    </Alert>
                </Snackbar>

                <Snackbar open={openCart} autoHideDuration={3000} onClose={(event, reason) => {
                    setOpenCart(false);
                }}>
                    <Alert severity="success" sx={{width: '100%'}}>
                        <b> {item.titleRo} </b> a fost adăugat în coșul de cumpărături!
                    </Alert>
                </Snackbar>

                <div className="ContainerProd">
                    <div className="CircleProd">
                        <img className="ImageProd" src={item.image} onClick={goToProduct}/>
                        <div>
                            <div className="InfoProd">
                                <div className="IconProd">
                                    <button className="IconProd" onClick={addToCart}><ShoppingCart/></button>
                                </div>
                                <div className="IconProd">
                                    <button className="IconProd" onClick={addToFavorites}><Favorite/></button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="TitleProd" onClick={goToProduct}><b>{item.titleRo}</b><br/></div>
                <div className="TitleProd" onClick={goToProduct}>{item.author.name}<br/></div>
                <div onClick={goToProduct}>{item.price} lei</div>
            </div>
        )
    }
    else{
        return (
        <div>
            <Snackbar open={open} autoHideDuration={3000} onClose={(event, reason) => {
                setOpen(false);
            }}>
                <Alert severity="success" sx={{width: '100%'}}>
                    <b> {item.title} </b> has been added to your favorite list!
                </Alert>
            </Snackbar>

            <Snackbar open={openCart} autoHideDuration={3000} onClose={(event, reason) => {
                setOpenCart(false);
            }}>
                <Alert severity="success" sx={{width: '100%'}}>
                    <b> {item.title} </b> has been added to your cart!
                </Alert>
            </Snackbar>

            <div className="ContainerProd">
                <div className="CircleProd">
                    <img className="ImageProd" src={item.image} onClick={goToProduct}/>
                    <div>
                        <div className="InfoProd">
                            <div className="IconProd">
                                <button className="IconProd" onClick={addToCart}><ShoppingCart/></button>
                            </div>
                            <div className="IconProd">
                                <button className="IconProd" onClick={addToFavorites}><Favorite/></button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="TitleProd" onClick={goToProduct}><b>{item.title}</b><br/></div>
            <div className="TitleProd" onClick={goToProduct}>{item.author.name}<br/></div>
            <div onClick={goToProduct}>{item.price} lei</div>
        </div>
    )
    }

}
export default Prod
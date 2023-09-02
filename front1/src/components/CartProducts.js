import React from "react";
import { useState, useEffect } from 'react';
import axiosInstance from "axios";
import Prod from "./Prod";
import './Products.css'
import ProdCart from "./ProdCart";
import {ShoppingCart} from "@material-ui/icons";
import {Button, CircularProgress, Snackbar} from "@material-ui/core";
import {Alert} from "@mui/material";

const CartProducts = () => {
    const [open, setOpen] = React.useState(false);
    let state;
    state = {
        idClient: "",
    };


    let idClient = JSON.parse(localStorage.getItem('id'));
    state.idClient= idClient
    const [cart, setCart] = useState();
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isLoadingValue, setLoadingValue] = useState(true);
    let language = localStorage.getItem("language");

    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem("urlCrt", "http://localhost:3000/auth/cart")

            axiosInstance.get("http://localhost:8081/getCart/" + idClient)
                .then(
                    response => {
                        setCart(response.data);
                        setLoading(false)
                    });
        }, 500);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            axiosInstance.get("http://localhost:8081/getCartProducts/" + idClient)
                .then(
                    response => {
                        setPosts(Array.from(response.data));
                        setLoadingValue(false)
                    });
        }, 500);
    }, []);


    function placeOrder() {
        axiosInstance.post("http://localhost:8081/auth/placeOrder", state)
            .then(
                window.location.replace("http://localhost:3000/auth/homeUser")
            )
    }

    if (isLoading || isLoadingValue) {
        return (
            <div className="ContainerProducts" style={{ justifyContent: "center",}}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}>
                <CircularProgress color="inherit" /></div>
            </div>
        );
    }
    else {
        if(language.localeCompare("ro") === 0) {
            if (cart.value <= 0) {
                return (
                    <div className="ContainerProducts" style={{justifyContent: "center",}}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100vh",
                        }}>
                            <ShoppingCart/>
                            Coșul este gol!
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="ContainerProducts">
                        <div>
                            <Snackbar open={open} autoHideDuration={3000} onClose={(event, reason) => {
                                setOpen(false);
                            }}>
                                <Alert severity="success" sx={{width: '100%'}}>
                                    has been added to your favorite list!
                                </Alert>
                            </Snackbar>
                            <p>
                                <b> Valoare Totală: </b> {cart.value} lei
                            </p>
                            <p>
                                <b> Vei acumula {cart.value / 10} puncte!</b>
                            </p>

                            <button onClick={placeOrder}>PLASEAZĂ COMANDA</button>
                            <div className="ContainerCartProducts">
                                {posts.map((post) => (
                                    <ProdCart item={post}
                                              key={post.id}
                                              titleRo={post.titleRo}
                                              image={post.image}
                                              price={post.price}/>)
                                )}

                            </div>
                        </div>
                    </div>
                );
            }
        }
        else {
            if (cart.value <= 0) {
                return (
                    <div className="ContainerProducts" style={{justifyContent: "center",}}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100vh",
                        }}>
                            <ShoppingCart/>
                            Your cart is empty!
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="ContainerProducts">
                        <div>
                            <Snackbar open={open} autoHideDuration={3000} onClose={(event, reason) => {
                                setOpen(false);
                            }}>
                                <Alert severity="success" sx={{width: '100%'}}>
                                    has been added to your favorite list!
                                </Alert>
                            </Snackbar>
                            <p>
                                <b> Total value: </b> {cart.value} lei
                            </p>
                            <p>
                                <b> You will earn {cart.value / 10} points!</b>
                            </p>

                            <button onClick={placeOrder}>PLACE THE ORDER</button>
                            <div className="ContainerCartProducts">
                                {posts.map((post) => (
                                    <ProdCart item={post}
                                              key={post.id}
                                              title={post.title}
                                              image={post.image}
                                              price={post.price}/>)
                                )}

                            </div>
                        </div>
                    </div>
                );
            }
        }
    }
}
export default CartProducts
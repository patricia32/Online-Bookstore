import React from "react";
import { useState, useEffect } from 'react';
import axiosInstance from "axios";
import Prod from "./Prod";
import './Products.css'
import ProdCart from "./ProdCart";
import {Favorite, ShoppingCart} from "@material-ui/icons";
import {Button, CircularProgress} from "@material-ui/core";
import FavProd from "./FavProd";

import { saveAs } from 'file-saver';

const CartProducts = () => {
    let state;
    state = {
        idClient: "",
    };


    let idClient = JSON.parse(localStorage.getItem('id'));
    let language = localStorage.getItem("language");
    state.idClient= idClient
    const [cart, setCart] = useState();
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    let value;

    useEffect(() => {
        setTimeout(() => {
            axiosInstance.get("http://localhost:8081/getFavoriteProducts/" + idClient)
                .then(
                    response => {
                        value=1;
                        setPosts(Array.from(response.data));

                        setLoading(false)

                    })
            .catch(  error =>{
                value =0;
            });
        }, 500);
    }, []);


    function  exp()
    {
        axiosInstance.get("http://localhost:8081/auth/export/" + idClient)
            .then(res => {
                // let typeForBlob = 'text/plain;charset=utf-8': 'text/xml;charset=utf-8';
                let typeForBlob = 'text/xml;charset=utf-8';
                let blob = new Blob([res.data], {type: typeForBlob});
                saveAs(blob, "favorite-books-data." + "xml");
                console.log(blob);

            })
    }
    if (isLoading) {
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
        if (language.localeCompare("ro") === 0) {
            if (posts.length === 0) {
                return (
                    <div className="ContainerProducts" style={{justifyContent: "center",}}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100vh",
                        }}><Favorite/>
                            Adaugă cărți în lista de favorite!
                        </div>
                    </div>
                )
            } else {
                return (

                    <div className="ContainerProducts">
                        <div>
                            <Button onClick={exp}>Export</Button>
                            {posts.map((post) => (
                                <FavProd item={post}
                                         key={post.id}
                                         title={post.title}
                                         image={post.image}
                                         price={post.price}/>)
                            )}

                        </div>
                    </div>

                );
            }
        }

    else {
            if (posts.length === 0) {
                return (
                    <div className="ContainerProducts" style={{justifyContent: "center",}}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100vh",
                        }}><Favorite/>
                            Add books to your favorite list!
                        </div>
                    </div>
                )
            } else {
                return (

                    <div className="ContainerProducts">
                        <div>
                            <Button onClick={exp}>Export</Button>
                            {posts.map((post) => (
                                <FavProd item={post}
                                         key={post.id}
                                         title={post.title}
                                         image={post.image}
                                         price={post.price}/>)
                            )}

                        </div>
                    </div>

                );
            }
        }

    }
}
export default CartProducts
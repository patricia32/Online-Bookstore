import React, {useState} from 'react'
import "../components/NavbarUser.css";

import {Badge, Button, Menu, MenuItem, MenuList} from "@material-ui/core";
import axiosInstance from "axios";
import {Favorite, Person, Search, ShoppingCart} from "@material-ui/icons";

class NavbarUser extends React.Component {
    constructor() {
        super();
        this.language = localStorage.getItem("language");
    }
    onSubmitLogout = event => {
        console.log("yesd")
        event.preventDefault();
        let idClient = JSON.parse(localStorage.getItem('id'));
        axiosInstance.put("http://localhost:8081/auth/logout/" + idClient)
            .then( window.location.replace("http://localhost:3000"))

    }
    onSubmitAccount = event => {
        event.preventDefault();
        window.location.replace("http://localhost:3000/auth/aboutUser")
    }
    goHome = event =>{
        event.preventDefault();
        window.location.replace("http://localhost:3000/auth/homeUser")
    }

    goToCart = event =>{
        event.preventDefault();
        window.location.replace("http://localhost:3000/auth/cart")
    }
    goToFavorites = event =>{
        event.preventDefault();
        localStorage.setItem("urlCrt", "http://localhost:3000/auth/favorites")
        window.location.replace("http://localhost:3000/auth/favorites")
    }

    switchToRo = event => {
        event.preventDefault();
        localStorage.setItem("language", "ro");
        window.location.replace(localStorage.getItem("urlCrt"))
    }
    switchToEn = event => {
        event.preventDefault();
        localStorage.setItem("language", "en");
        window.location.replace(localStorage.getItem("urlCrt"))
    }
    render() {
        return (
            <div className="NavbarName">
                    <div className="Left">

                        <h1 className="Logo" onClick={this.goHome}>
                            LAMA.
                        </h1>
                    </div>
                    <div className="Center">
                        <div className="SearchC">
                            <input className="Input"/>
                            <Search style={{color: "gray", fontSize: 26}}/>
                        </div>
                    </div>
                    <div className="Right">
                        <div className="MenuItem">
                            <form  onSubmit={this.onSubmitAccount}><Button type="submit"><Person/></Button></form>
                        </div>
                        <div className="MenuItem">
                            <form onSubmit={this.goToFavorites}><Button type="submit"  ><Favorite/></Button></form>
                        </div>
                        <div className="MenuItem">
                            <form onSubmit={this.goToCart}><Button type="submit"  ><ShoppingCart/></Button></form>
                        </div>
                        <div className="MenuItem">
                            <form onClick={this.onSubmitLogout}><button className="Button2"  >LOG OUT</button></form>
                        </div>
                        <div className="MenuItem">
                            <form  ><Button onClick={this.switchToEn}>en</Button></form>
                        </div>
                        <div className="MenuItem">
                            <form  ><Button onClick={this.switchToRo}>ro</Button></form>
                        </div>
                    </div>

            </div>
        )
    }
}
export default NavbarUser;
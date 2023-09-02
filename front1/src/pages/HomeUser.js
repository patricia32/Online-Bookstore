import React from 'react'
import NavbarUser from "../components/NavbarUser.js";
import Products from "../components/Products";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import axiosInstance from "axios";

function HomeUser(){
    localStorage.setItem("urlCrt", "http://localhost:3000/auth/homeUser")


        console.log("In Connect");
        const URL = "http://localhost:8081/socket";
        const websocket = new SockJS(URL);
        const stompClient = Stomp.over(websocket);
        stompClient.connect({}, frame => {
            stompClient.subscribe("/topic/socket/admin", notification => {
                let message = notification.body;
                let idClient = JSON.parse(localStorage.getItem('id'));
                let bookTitle = message.substring(0, message.indexOf("is back in stock!"))
                axiosInstance.get("http://localhost:8081/admin/testFavs/" + idClient + '/' + bookTitle)
                    .then(r =>      alert(message) )
             //   if(message.includes(": 1")){

               // }
            })
        })

    return(
        <div>
            <NavbarUser/>
            <Products/>
        </div>
    )
}
export default HomeUser
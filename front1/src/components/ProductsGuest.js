import React from "react";
import { useState, useEffect } from 'react';
import axiosInstance from "axios";
import Prod from "./Prod";
import './Products.css'
import ProdGuest from "./ProdGuest";
import {CircularProgress} from "@material-ui/core";

const ProductsGuest = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    let asc = localStorage.getItem('sortAscending')
    let desc = localStorage.getItem('sortDescending')
    let thriller = localStorage.getItem('thriller')
    let economy = localStorage.getItem('economy')
    let youngAdult = localStorage.getItem('youngAdult')
    let language = localStorage.getItem("language");

    useEffect(() => {
        setTimeout(() => {
            axiosInstance.get("http://localhost:8081/getProducts")
                .then(
                    response => {
                        setPosts(Array.from(response.data));
                        //asc
                        if (asc === "1") {
                            localStorage.setItem('sortAscending', '0')
                            setPosts(response.data.sort((a, b) => a.price > b.price ? 1 : -1))
                            localStorage.setItem('sortDescending', '0')
                        }

                        //desc
                        if (desc === "1") {
                            localStorage.setItem('sortDescending', '0')
                            setPosts(response.data.sort((a, b) => a.price < b.price ? 1 : -1))
                            localStorage.setItem('sortAscending', '0')
                        }

                        //thriller
                        if (thriller === "1") {
                            localStorage.setItem('sortAscending', '0')
                            localStorage.setItem('sortDescending', '0')
                            localStorage.setItem('youngAdult', '0')
                            setPosts(response.data.filter(obj => obj.category === "Thriller"))
                            localStorage.setItem('thriller', '0')
                        }

                        //economy
                        if (economy === "1") {
                            localStorage.setItem('sortAscending', '0')
                            localStorage.setItem('sortDescending', '0')
                            localStorage.setItem('thriller', '0')
                            localStorage.setItem('youngAdult', '0')
                            setPosts(response.data.filter(obj => obj.category === "Economie" || obj.category === "Economy"))
                            localStorage.setItem('economy', '0')
                        }

                        //youngAdult
                        if (youngAdult === "1") {
                            localStorage.setItem('sortAscending', '0')
                            localStorage.setItem('sortDescending', '0')
                            localStorage.setItem('thriller', '0')
                            localStorage.setItem('economy', '0')
                            setPosts(response.data.filter(obj => obj.category === "Young adult"))
                            localStorage.setItem('youngAdult', '0')
                        }
                        setLoading(false)
                    });
        }, 500);
    }, []);

    function sortAscending() {
        localStorage.setItem('sortAscending', '1');
        window.location.replace("http://localhost:3000")
    }

    function sortDescending() {
        localStorage.setItem('sortDescending', '1');
        window.location.replace("http://localhost:3000")
    }

    function filterThriller() {
        localStorage.setItem('thriller', '1');
        window.location.replace("http://localhost:3000")
    }

    function filterEconomy() {
        localStorage.setItem('economy', '1');
        window.location.replace("http://localhost:3000")
    }

    function filterYoungAdult() {
        localStorage.setItem('youngAdult', '1');
        window.location.replace("http://localhost:3000")
    }

    if (isLoading) {
        return (
            <div className="ContainerProducts" style={{justifyContent: "center",}}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                }}>
                    <CircularProgress color="inherit"/></div>
            </div>
        );
    } else {
        if (language.localeCompare("ro") === 0) {
            return (
                <div className="ContainerProducts">
                    <div className="Menu">
                        <h4> Sortează după</h4>
                        <div className="select" onClick={sortAscending}> Preț crescător</div>
                        <div className="select" onClick={sortDescending}> Preț descrescător</div>
                        <h4> Categorie </h4>
                        <div className="select" onClick={filterThriller}> Thriller</div>
                        <div className="select" onClick={filterEconomy}> Economie</div>
                        <div className="select" onClick={filterYoungAdult}> Adolescenți</div>
                    </div>
                    {posts.map((post) => (
                        <ProdGuest item={post}
                                   key={post.id}
                                   titleRo={post.titleRo}
                                   author={post.author}
                                   price={post.price}
                                   image={post.image}/>))}
                </div>
            )
        } else {
            return (
                <div className="ContainerProducts">
                    <div className="Menu">
                        <h4> Sort by</h4>
                        <div className="select" onClick={sortAscending}> Price ascending</div>
                        <div className="select" onClick={sortDescending}> Price descending</div>
                        <h4> Category </h4>
                        <div className="select" onClick={filterThriller}> Thriller</div>
                        <div className="select" onClick={filterEconomy}> Economy</div>
                        <div className="select" onClick={filterYoungAdult}> Young adult</div>
                    </div>
                    {posts.map((post) => (
                        <ProdGuest item={post}
                                   key={post.id}
                                   title={post.title}
                                   author={post.author}
                                   price={post.price}
                                   image={post.image}/>))}
                </div>
            )
        }
    }
}
export default ProductsGuest
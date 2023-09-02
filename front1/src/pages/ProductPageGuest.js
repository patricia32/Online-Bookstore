import React, {useEffect, useState} from "react";
import '../components/Left.css'
import axios from "axios";
import Navbar from "../components/Navbar";
import LeftGuest1 from "../components/LeftGuest1";
import Right from "../components/Right";
import {CircularProgress} from "@material-ui/core";

function ProductPageGuest() {
    const idProductLOCAL = JSON.parse(localStorage.getItem('productId'));


    const [posts, setPosts] = useState();
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            axios.get('http://localhost:8081/auth/'+idProductLOCAL)
                .then(
                    response => {
                        setPosts(response.data);
                        setLoading(false)
                    });
        }, 500);
    }, []);


    if (isLoading) {
        return (
            <div>
            <Navbar/>

            <div className="ContainerProducts" style={{ justifyContent: "center",}}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}>
                <CircularProgress color="inherit" /></div>
            </div>    </div>
        );
    } else {
        return (

            <div className="HomeProdPage">
                <Navbar/>
                <div className="ContainerProducts" style={{ justifyContent: "center",}}>
                <div className="wrapperProdPage">
                    <LeftGuest1 item={posts}
                          key={posts.id}
                          title={posts.title}
                          author={posts.author}
                                publisher={posts.publisher}
                          price={posts.price}
                                pagesNo={posts.pagesNo}
                          category={posts.category}
                          description={posts.description}/>
                    <Right item={posts}
                           image={posts.image}/>
                </div>
            </div>
            </div>
        )
    }
}
export default ProductPageGuest

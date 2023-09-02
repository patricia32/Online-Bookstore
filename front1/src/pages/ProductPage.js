import NavbarUser from "../components/NavbarUser";
import React, {useEffect, useState} from "react";
import { CircularProgress} from "@material-ui/core";
import '../components/Left.css'
import '../components/Right.css'
import './ProductPage.css'
import Left from "../components/Left.js"
import Right from "../components/Right.js"
import axios from "axios";

function ProductPage() {
    const idProductLOCAL = JSON.parse(localStorage.getItem('productId'));
    let language = localStorage.getItem("language");
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
                <NavbarUser/>

            <div className="ContainerProducts" style={{ justifyContent: "center",}}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}>
                <CircularProgress color="inherit" /></div>
            </div>  </div>
        );
    } else {
        if (language.localeCompare("ro") === 0) {
            return (
                <div className="HomeProdPage">
                    <NavbarUser/>
                    <div className="ContainerProducts" style={{justifyContent: "center",}}>
                        <div className="wrapperProdPage">
                            <Left item={posts}
                                  key={posts.id}
                                  title={posts.title}
                                  author={posts.author}
                                  publisher={posts.publisher}
                                  pagesNo={posts.pagesNo}
                                  price={posts.price}
                                  category={posts.category}
                                  description={posts.description}/>
                            <Right item={posts}
                                   image={posts.image}/>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="HomeProdPage">
                    <NavbarUser/>
                    <div className="ContainerProducts" style={{justifyContent: "center",}}>
                        <div className="wrapperProdPage">
                            <Left item={posts}
                                  key={posts.id}
                                  title={posts.title}
                                  author={posts.author}
                                  publisher={posts.publisher}
                                  pagesNo={posts.pagesNo}
                                  price={posts.price}
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
}
export default ProductPage

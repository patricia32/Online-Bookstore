import React from 'react'
import "./AboutUser.css"
import "./Register.js"
import '../components/ProdCart.css'
import {TextField} from "@mui/material";
import axiosInstance from "axios";
import NavbarAdmin from "../components/NavbarAdmin";
import axios from "axios";



class ProductEdit extends React.Component {
    constructor() {
        super();
        this.isLoading = true;
        this.state = {
            id: localStorage.getItem("productId"),
            title:"",
            titleRo: "",
            price: "",
            pagesNo:"",
            category:"",
            categoryRo:"",
            releaseYear:"",
            stock:"",
            image:"",
            description:"",
            descriptionRo:"",
            author:"",
            publisher:"",
        };
        axios.get('http://localhost:8081/auth/'+ this.state.id)
            .then(
                response => {
                  this.setState(response.data);
                });
    }


    handleInput = event => {
        const {value, name} = event.target;
        this.setState({
            [name]: value,

        });
        if(name.localeCompare("Author"))
            localStorage.setItem("authorName", value)
        if(name.localeCompare("Publisher"))
            localStorage.setItem("publisherName", value)

    };

    saveChanges = event => {
        event.preventDefault();
        let stateForUpdate = {
            id: localStorage.getItem("productId"),
            title: this.state.title,
            titleRo: this.state.titleRo,
            price: this.state.price,
            pagesNo: this.state.pagesNo,
            category: this.state.category,
            categoryRo: this.state.categoryRo,
            releaseYear: this.state.releaseYear,
            stock: this.state.stock,
            image: this.state.image,
            description: this.state.description,
            descriptionRo: this.state.descriptionRo,
            authorId:this.state.author.id,
            authorName: localStorage.getItem("authorName"),
            publisherId:this.state.publisher.id,
            publisherName: localStorage.getItem("publisherName"),
        }
        console.log("update" + stateForUpdate.author)
        axiosInstance.put("http://localhost:8081/admin/productUpdate", stateForUpdate)
            .then(window.location.replace("http://localhost:3000/admin/productEdit"))
            .catch(error => {
                alert("Wrong password!")
                console.log(error)
            })
    }

    render() {
            return (
                <div>
                    <NavbarAdmin/>
                    <div className="ContainerProducts">
                        <div className="Container1">
                            <h1 className="Title"><b>Book Edit</b></h1>
                            <div className="Wrapper1">
                                <form onSubmit={this.onSubmitFun1}>
                                    <TextField required
                                               name="title"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               value={this.state.title}
                                               color="secondary"
                                               label="Title"/>
                                    <TextField required
                                               value={this.state.titleRo}
                                               name="titleRo"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Romanian Title"/>
                                    <TextField required
                                               value={this.state.author.name}
                                               name="author"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Author"/>
                                    <TextField required
                                               value={this.state.publisher.name}
                                               name="publisher"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Publisher"/>
                                    <TextField value={this.state.category}
                                               required
                                               name="category"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Category"/>
                                    <TextField value={this.state.categoryRo}
                                               required
                                               name="categoryRo"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Romanian Category"/>
                                    <TextField value={this.state.price}
                                               required
                                               type="number"
                                               name="price"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Price"/>
                                    <TextField value={this.state.releaseYear}
                                               required
                                               type="number"
                                               name="releaseYear"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Release Year"/>
                                    <TextField value={this.state.pagesNo}
                                               required
                                               type="number"
                                               name="pagesNo"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Pages number"/>
                                    <TextField value={this.state.description}
                                               required
                                               name="description"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               multiline
                                               color="secondary"
                                               label="Description"/>
                                    <TextField value={this.state.descriptionRo}
                                               required
                                                multiline
                                               name="descriptionRo"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Romanian Description"/>
                                    <TextField value={this.state.image}
                                               required
                                               name="image"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Image relative path"/>
                                    <TextField value={this.state.stock}
                                               required
                                               name="stock"
                                               type="number"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Stock"/>
                                    <button className="Button1" onClick={this.saveChanges}>Save changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}
export default ProductEdit;


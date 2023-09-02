import React from 'react'
import "./AboutUser.css"
import "./Register.js"
import '../components/ProdCart.css'
import {TextField} from "@mui/material";
import axiosInstance from "axios";
import NavbarAdmin from "../components/NavbarAdmin";
import axios from "axios";


class AddProductPage extends React.Component {
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
    }


    handleInput = event => {
        const {value, name} = event.target;
        this.setState({
            [name]: value,

        });
        if(name === "author") {
        console.log("print in " + name+ " val " + value)
            localStorage.setItem("authorName", value)
        }
        if(name ==="publisher"){
            console.log("print in " + name+ " val " + value)
            localStorage.setItem("publisherName", value)
        }

    };

    saveBook = event => {
        event.preventDefault();
        let stateForUpdate = {
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
            authorName: localStorage.getItem("authorName"),
            publisherName: localStorage.getItem("publisherName"),
        }

        console.log(stateForUpdate.authorName)
        axiosInstance.post("http://localhost:8081/admin/productSave", stateForUpdate)
            .then(
                window.location.replace("http://localhost:3000/admin/homepage"))
            .catch(error => {
                alert("This book already exists.")
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <NavbarAdmin/>
                <div className="ContainerProducts">
                    <div className="Container1">
                        <h1 className="Title"><b>Create new book</b></h1>
                        <div className="Wrapper1">
                            <form onSubmit={this.onSubmitFun1}>
                                <TextField required
                                           name="title"
                                           onChange={this.handleInput}
                                           variant="standard"
                                           fullWidth
                                           color="secondary"
                                           label="Title"/>
                                <TextField required
                                           name="titleRo"
                                           onChange={this.handleInput}
                                           variant="standard"
                                           fullWidth
                                           color="secondary"
                                           label="Romanian Title"/>
                                <TextField required
                                           name="author"
                                           onChange={this.handleInput}
                                           variant="standard"
                                           fullWidth
                                           color="secondary"
                                           label="Author"/>
                                <TextField required
                                           name="publisher"
                                           onChange={this.handleInput}
                                           variant="standard"
                                           fullWidth
                                           color="secondary"
                                           label="Publisher"/>
                                <TextField required
                                           name="category"
                                           onChange={this.handleInput}
                                           variant="standard"
                                           fullWidth
                                           color="secondary"
                                           label="Category"/>
                                <TextField required
                                           name="categoryRo"
                                           onChange={this.handleInput}
                                           variant="standard"
                                           fullWidth
                                           color="secondary"
                                           label="Romanian Category"/>
                                <TextField required
                                           name="price"
                                           onChange={this.handleInput}
                                           variant="standard"
                                           fullWidth
                                           type="number"
                                           color="secondary"
                                           label="Price"/>
                                <TextField required
                                           name="releaseYear"
                                           type="number"
                                           onChange={this.handleInput}
                                           variant="standard"
                                           fullWidth
                                           color="secondary"
                                           label="Release Year"/>
                                <TextField required
                                           name="pagesNo"
                                           onChange={this.handleInput}
                                           variant="standard"
                                           fullWidth
                                           type="number"
                                           color="secondary"
                                           label="Pages number"/>
                                <TextField required
                                           name="description"
                                           onChange={this.handleInput}
                                           variant="standard"
                                           fullWidth
                                           multiline
                                           color="secondary"
                                           label="Description"/>
                                <TextField required
                                           multiline
                                           name="descriptionRo"
                                           onChange={this.handleInput}
                                           variant="standard"
                                           fullWidth
                                           color="secondary"
                                           label="Romanian Description"/>
                                <TextField required
                                           name="image"
                                           onChange={this.handleInput}
                                           variant="standard"
                                           fullWidth
                                           color="secondary"
                                           label="Image relative path"/>
                                <TextField required
                                           name="stock"
                                           type="number"
                                           onChange={this.handleInput}
                                           variant="standard"
                                           fullWidth
                                           color="secondary"
                                           label="Stock"/>
                                <button className="Button1" onClick={this.saveBook}>Save book</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddProductPage;


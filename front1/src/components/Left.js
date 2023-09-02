import {Button} from "@material-ui/core";
import {ArrowForward} from "@material-ui/icons";
import React, {useState} from "react";
import axiosInstance from "axios";
import "./Left.css"

const Left = ({item}) => {
    const idProductLOCAL = JSON.parse(localStorage.getItem('productId'));
    const idClientLOCAL = JSON.parse(localStorage.getItem('id'));
    const [review, setReview] = useState("")
    let language = localStorage.getItem("language");


    function addToCart() {
        axiosInstance.put("http://localhost:8081/addToCart/" + idClientLOCAL + "/" + idProductLOCAL)
    }

    function handleInput(event) {
        const {value, name} = event.target;
        setReview(value)
        console.log(value);
    }

    function onSubmitFun12(event) {
        event.preventDefault();
        let addReviewDTO = {
            idProduct: idProductLOCAL,
            idClient: idClientLOCAL,
            review: review
        }
        axiosInstance.post("http://localhost:8081/auth/addReview", addReviewDTO)
            .then(window.location.replace("http://localhost:3000/auth/product"))
    }

    if (language.localeCompare("ro") === 0) {
        return (
            <div className="left">
                <h1 className="leftHeading"> {item.titleRo}</h1>
                <p className="leftText-2">
                    <b>Preț </b>{item.price} <br/>
                    <b>Autor </b>{item.author.name} <br/>
                    <b>Editură </b>{item.publisher.name}<br/>
                    <b>Număr de pagini </b>{item.pagesNo}<br/>
                    <b>Categorie </b>{item.categoryRo}

                </p>
                <p className="leftText-3">
                    <b>Descriere </b><br/>
                    {item.descriptionRo}<br/>
                </p>
                <Button onClick={addToCart}>ADAUGĂ ÎN COȘ <ArrowForward/></Button>
                <p className="leftText-3">
                    <b>Recenzii</b><br/>
                    {item.reviews.map((rev) => <p>
                        <b>{rev.client.username}</b><br/>
                        {rev.reviewInfo}
                    </p>)}
                </p><input placeholder="Scrie o recenzie" name="newReview" onChange={handleInput}/><p>
                <Button onClick={onSubmitFun12}>ADAUGĂ RECENZIE</Button>
            </p>
            </div>
        )
    }
    else{
        return (
            <div className="left">
                <h1 className="leftHeading"> {item.title}</h1>
                <p className="leftText-2">
                    <b>Price </b>{item.price} <br/>
                    <b>Author </b>{item.author.name} <br/>
                    <b>Publisher </b>{item.publisher.name}<br/>
                    <b>Pages number </b>{item.pagesNo}<br/>
                    <b>Category </b>{item.category}

                </p>
                <p className="leftText-3">
                    <b>Description </b><br/>
                    {item.description}<br/>
                </p>
                <Button onClick={addToCart}>BUY NOW <ArrowForward/></Button>
                <p className="leftText-3">
                    <b>Reviews</b><br/>
                    {item.reviews.map((rev) => <p>
                        <b>{rev.client.username}</b><br/>
                        {rev.reviewInfo}
                    </p>)}
                </p><input placeholder="Write a review" name="newReview" onChange={handleInput}/><p>
                <Button onClick={onSubmitFun12}>ADD REVIEW</Button>
            </p>
            </div>
        )
    }
}
export default Left;
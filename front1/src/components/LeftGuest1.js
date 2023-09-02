import {Button} from "@material-ui/core";
import {ArrowForward} from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import axios from "axios";
import axiosInstance from "axios";
import "./Left.css"

const Left = ({item}) => {
    const idProductLOCAL = JSON.parse(localStorage.getItem('productId'));
    const idClientLOCAL = JSON.parse(localStorage.getItem('id'));
    const [review, setReview] = useState("")
    let language = localStorage.getItem("language");

    if (language.localeCompare("ro") === 0) {
        return (
            <div className="left">
                <h1 className="leftHeading"> {item.titleRo}</h1>
                <p className="leftText-2">
                    <b>Preț </b>{item.price} <br/>
                    <b>Autor </b>{item.author.name} <br/>
                    <b>Editură </b>{item.publisher.name}<br/>
                    <b>Numărul de pagini </b> {item.pagesNo}<br/>
                    <b>Categorie </b>{item.categoryRo}
                </p>
                <p className="leftText-3">
                    <b>Descriere </b><br/>
                    {item.descriptionRo}<br/>
                </p>
                <p className="leftText-3">
                    <b>Recenzii</b><br/>
                    {item.reviews.map((rev) => <p>
                        <b>{rev.client.username}</b><br/>
                        {rev.reviewInfo}
                    </p>)}

                </p>
            </div>
        )
    }
    else {
        return (
            <div className="left">
                <h1 className="leftHeading"> {item.title}</h1>
                <p className="leftText-2">
                    <b>Price </b>{item.price} <br/>
                    <b>Author </b>{item.author.name} <br/>
                    <b>Publisher </b>{item.publisher.name}<br/>
                    <b>Pages number </b> {item.pagesNo}<br/>
                    <b>Category </b>{item.category}
                </p>
                <p className="leftText-3">
                    <b>Description </b><br/>
                    {item.description}<br/>
                </p>
                <p className="leftText-3">
                    <b>Reviews</b><br/>
                    {item.reviews.map((rev) => <p>
                        <b>{rev.client.username}</b><br/>
                        {rev.reviewInfo}
                    </p>)}

                </p>
            </div>
        )
    }
}
export default Left;
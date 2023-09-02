import React, {useEffect} from "react";
import {Delete, Edit} from "@material-ui/icons";
import './Prod.css'
import axiosInstance from "axios";
import '../components/history'
import {Snackbar} from "@material-ui/core";
import {Alert} from "@mui/material";


const ProdAdmin = ({item}) => {
    const [open, setOpen] = React.useState(false);

    function editProduct(){
        localStorage.setItem("productId", item.id)
        window.location.replace("http://localhost:3000/admin/productEdit")
    }

    function deleteProduct(){
        axiosInstance.delete("http://localhost:8081/admin/productDelete/" + item.id)
            .then(window.location.replace("http://localhost:3000/admin/homepage"))

    }
        return (
            <div>
                <Snackbar open={open} autoHideDuration={3000} onClose={(event, reason) => {
                    setOpen(false);
                }}>
                    <Alert severity="success" sx={{width: '100%'}}>
                        <b> {item.title} </b> has been added to your favorite list!
                    </Alert>
                </Snackbar>
                <div className="ContainerProd">
                    <div className="CircleProd">
                        <img className="ImageProd" src={item.image}/>
                        <div>
                            <div className="InfoProd">
                                <div className="IconProd">
                                    <button className="IconProd" onClick={editProduct}><Edit/></button>
                                </div>
                                <div className="IconProd">
                                    <button className="IconProd" onClick={deleteProduct} ><Delete/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="TitleProd" onClick={editProduct}><b>{item.title}</b><br/></div>
                <div className="TitleProd" onClick={editProduct}>{item.author.name}<br/></div>
                <div onClick={editProduct}>{item.price} lei</div>
            </div>
        )
}
export default ProdAdmin
import React, {useEffect, useState} from 'react'
import NavbarUser from "../components/NavbarUser.js";
import "./AboutUser.css"
import "./Register.js"
import '../components/ProdCart.css'
import {TextField} from "@mui/material";
import axiosInstance from "axios";


class AboutUser extends React.Component {
    constructor() {
        super();
        this.isLoading = true;
        this.isLoading2 = false;
        this.state = {
            name:"",
            username: "",
            password: "",
            phone:"",
            email:"",
            address:"",
        };
        this.usernameLOCAL = JSON.parse(localStorage.getItem('username'));
        this.passwordLOCAL = JSON.parse(localStorage.getItem('password'));
        this.credentials1 = {
            username: this.usernameLOCAL,
            password: this.passwordLOCAL,
        }
        this.language = localStorage.getItem("language");
        axiosInstance.post("http://localhost:8081/auth/findInfo", this.credentials1)
            .then(
                response => {
                    this.setState(response.data);
                    localStorage.setItem('id', response.data.id)
                    this.isLoading = false;
                });
        localStorage.setItem("urlCrt", "http://localhost:3000/auth/aboutUser")
    }


    handleInput = event => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    };

    onSubmitFun1 = event => {
        event.preventDefault();
        let credentialsForUpdate = {
            name: this.state.name,
            username: this.usernameLOCAL,
            password: this.state.password,
            //confirmPassword: state.confirmPassword,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
        }
                axiosInstance.put("http://localhost:8081/auth/aboutUser", credentialsForUpdate)
                    .then(window.location.replace("http://localhost:3000/auth/aboutUser"))
                    .catch(error => {
                        alert("Wrong password!")
                        console.log(error)
                    })
    }
    render() {
        if (this.language.localeCompare("ro") === 0) {
            return (
                <div>
                    <NavbarUser/>
                    <div className="ContainerProducts">
                        <div className="Container1">
                            <h1 className="Title"><b>Profil și Securitate</b></h1>
                            <div className="Wrapper1">
                                <form onSubmit={this.onSubmitFun1}>
                                    <TextField value={this.state.name}
                                               required
                                               name="name"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Nume"/>

                                    <TextField value={this.state.username}
                                               type="read-only"
                                               disabled
                                               name="username"
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label={this.state.username}/>


                                    <TextField required
                                               type="password"
                                               name="password"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Parola"/>

                                    {/*<TextField  placeholder="*********"*/}
                                    {/*            required*/}
                                    {/*            type="password"*/}
                                    {/*            name="password2"*/}
                                    {/*            onChange={handleInput}*/}
                                    {/*            variant="standard"*/}
                                    {/*            fullWidth*/}
                                    {/*            color="secondary"*/}
                                    {/*            label="Confirm Password"/>*/}

                                    <TextField value={this.state.email}
                                               required
                                               name="email"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Email"/>

                                    <TextField value={this.state.phone}
                                               required
                                               name="phone"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Telefon"/>

                                    <TextField value={this.state.address}
                                               required
                                               name="address"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Adresă"/>
                                    <div>
                                        Ai acumulat {this.state.points} puncte!

                                    </div>
                                    <button type="submit" className="Button1">Salvează schimbările</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <NavbarUser/>
                    <div className="ContainerProducts">
                        <div className="Container1">
                            <h1 className="Title"><b>Profile and Security</b></h1>
                            <div className="Wrapper1">
                                <form onSubmit={this.onSubmitFun1}>
                                    <TextField value={this.state.name}
                                               required
                                               name="name"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Name"/>

                                    <TextField value={this.state.username}
                                               type="read-only"
                                               disabled
                                               name="username"
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label={this.state.username}/>


                                    <TextField required
                                               type="password"
                                               name="password"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Password"/>

                                    {/*<TextField  placeholder="*********"*/}
                                    {/*            required*/}
                                    {/*            type="password"*/}
                                    {/*            name="password2"*/}
                                    {/*            onChange={handleInput}*/}
                                    {/*            variant="standard"*/}
                                    {/*            fullWidth*/}
                                    {/*            color="secondary"*/}
                                    {/*            label="Confirm Password"/>*/}

                                    <TextField value={this.state.email}
                                               required
                                               name="email"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               type="email"
                                               color="secondary"
                                               label="Email"/>

                                    <TextField value={this.state.phone}
                                               required
                                               name="phone"
                                               type="number"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Phone"/>

                                    <TextField value={this.state.address}
                                               required
                                               name="address"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Address"/>
                                    <div>
                                        You have {this.state.points} points!

                                    </div>
                                    <button type="submit" className="Button1">Save changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

    }
}
export default AboutUser;


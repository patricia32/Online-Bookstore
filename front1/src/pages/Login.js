import React from 'react'
import "../pages/Login.css";
import axiosInstance from "axios";
import '../components/history'
import Navbar from "../components/Navbar";
import {TextField} from "@material-ui/core";
import './AboutUser.css'
import NavbarUser from "../components/NavbarUser";

class Login extends React.Component {


    constructor() {
        super();
        this.state = {
            username: "ss",
            password: "",
        };
        this.language = localStorage.getItem("language");

        this.usernameError ='';
       this.passwordError= '';
    }

    handleInput = event => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
        console.log(value);
    };

    handleCreateAccount = event => {
        event.preventDefault();
        localStorage.setItem("urlCrt", "http://localhost:3000/auth/register")
        window.location.replace("http://localhost:3000/auth/register")
    }

    adminLogin = event => {
        let credentials = {
            username: this.state.username,
            password: this.state.password,

        }
        axiosInstance.post("http://localhost:8081/auth/admin/login", credentials)
            .then(
                res => {
                    const val = res.data;
                    localStorage.setItem('id', JSON.stringify(val.id));
                    localStorage.setItem('username', JSON.stringify(val.username));
                    localStorage.setItem('password', JSON.stringify(val.password));
                    window.location.replace("http://localhost:3000/admin/homepage")
                })
            .catch(error => {
                alert("Wrong credentials.")
            })
    }
    userLogin = event => {
        event.preventDefault();
        let credentials = {
            username: this.state.username,
            password: this.state.password,

        }
        axiosInstance.post("http://localhost:8081/auth/login", credentials)
            .then(
                res => {
                    const val = res.data;
                    localStorage.setItem('id', JSON.stringify(val.id));
                    localStorage.setItem('username', JSON.stringify(val.username));
                    localStorage.setItem('password', JSON.stringify(val.password));
                    window.location.replace("http://localhost:3000/auth/homeUser")
                })
            .catch(error => {
                console.log("catch client")
              this.adminLogin()
            })
    }

    render() {
        if (this.language.localeCompare("ro") === 0) {
            return (
                <div>
                    <Navbar/>
                    <div className="ContainerProducts">
                        <div className="Container1">
                            <h1 className="Title"><b>Intră în cont</b></h1>
                            <div className="Wrapper1">
                                <form onSubmit={this.userLogin}>
                                    <TextField onChange={this.handleInput}
                                               name="username"
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Username"/>

                                    <TextField
                                        required
                                        type="password"
                                        name="password"
                                        onChange={this.handleInput}
                                        variant="standard"
                                        fullWidth
                                        color="secondary"
                                        label="Parolă"/>

                                    <button type="submit" className="Button1"> LOGARE</button>
                                    <div className="select" onClick={this.handleCreateAccount}> Nu ai încă un cont?
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Navbar/>
                    <div className="ContainerProducts">
                        <div className="Container1">
                            <h1 className="Title"><b>Login</b></h1>
                            <div className="Wrapper1">
                                <form onSubmit={this.userLogin}>
                                    <TextField onChange={this.handleInput}
                                               name="username"
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Username"/>

                                    <TextField
                                        required
                                        type="password"
                                        name="password"
                                        onChange={this.handleInput}
                                        variant="standard"
                                        fullWidth
                                        color="secondary"
                                        label="Password"/>


                                    <button type="submit" className="Button1"> LOG IN</button>
                                    <div className="select" onClick={this.handleCreateAccount}> Do not have an
                                        account?
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default Login;
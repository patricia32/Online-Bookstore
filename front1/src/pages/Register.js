import React from 'react'
import "../pages/Register.css";
import axiosInstance from "axios";
import {TextField} from "@material-ui/core";
import Navbar from "../components/Navbar";


class Register extends React.Component {

    constructor() {
        super();
       this.open = false;
        this.state = {
            name: "",
            username: "ss",
            password: "",
            //confirmPassword: "",
            email: "",
            phone: "",
            address: "",
        };

        this.language = localStorage.getItem("language");
    }

    handleInput = event => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
        console.log(value)
    };
    onSubmitFun = event => {
        event.preventDefault();
        console.log(this.state.name);
        let credentials = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            //confirmPassword: this.state.confirmPassword,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
        }
        axiosInstance.post("http://localhost:8081/auth/register", credentials)
            .then(
                res => {
                    const val = res.data;
                    localStorage.setItem('id', JSON.stringify(val.id));
                    localStorage.setItem('username', JSON.stringify(val.username));
                    localStorage.setItem('password', JSON.stringify(val.password));
                   window.location.replace("http://localhost:3000/auth/homeUser")
                })
            .catch(error => {
                alert(error.response.data)
            })
    }

    render() {
        if (this.language.localeCompare("ro") === 0) {
            return (
                <div>
                    <Navbar/>
                    <div className="ContainerProducts">
                        <div className="Container1">
                            <h1 className="Title"><b>Creează un cont</b></h1>
                            <div className="Wrapper1">
                                <form onSubmit={this.onSubmitFun}>
                                    <TextField placeholder={this.state.name}
                                               required
                                               name="name"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Nume"/>

                                    <TextField placeholder={this.state.username}
                                               name="username"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Username"/>

                                    <TextField placeholder="*********"
                                               required
                                               type="password"
                                               name="password"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Parolă"/>

                                    {/*<TextField  placeholder="*********"*/}
                                    {/*            required*/}
                                    {/*            type="password"*/}
                                    {/*            name="password2"*/}
                                    {/*            onChange={handleInput}*/}
                                    {/*            variant="standard"*/}
                                    {/*            fullWidth*/}
                                    {/*            color="secondary"*/}
                                    {/*            label="Confirm Password"/>*/}

                                    <TextField placeholder={this.state.email}
                                               required
                                               name="email"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Email"/>

                                    <TextField placeholder={this.state.phone}
                                               required
                                               name="phone"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Telefon"/>

                                    <TextField placeholder={this.state.address}
                                               required
                                               name="address"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Adresă"/>

                                    <button type="submit" className="Button1"> CREEAZĂ CONT </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Navbar/>
                    <div className="ContainerProducts">
                        <div className="Container1">
                            <h1 className="Title"><b>Create an account</b></h1>
                            <div className="Wrapper1">
                                <form onSubmit={this.onSubmitFun}>
                                    <TextField placeholder={this.state.name}
                                               required
                                               name="name"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Name"/>

                                    <TextField placeholder={this.state.username}
                                               name="username"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Username"/>

                                    <TextField placeholder="*********"
                                               required
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

                                    <TextField placeholder={this.state.email}
                                               required
                                               name="email"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Email"/>

                                    <TextField placeholder={this.state.phone}
                                               required
                                               name="phone"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Phone"/>

                                    <TextField placeholder={this.state.address}
                                               required
                                               name="address"
                                               onChange={this.handleInput}
                                               variant="standard"
                                               fullWidth
                                               color="secondary"
                                               label="Address"/>

                                    <button type="submit" className="Button1"> SIGN IN</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
export default Register;
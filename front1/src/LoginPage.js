import React from "react";
import {Button, Container, TextField} from "@mui/material";
import axiosInstance from 'axios';
import history from 'history';
import {Grid} from "@mui/material";
import Navbar from "./components/Navbar";

class LoginPage extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        };
    }

    handleInput = event => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
        console.log(value);
    };

    onSubmitFun = event => {
        event.preventDefault();
        let credentials = {
            username: this.state.username,
            password: this.state.password,
        }
        console.log("onSubmit")
        axiosInstance.post("http://localhost:8081/login", credentials)
            .then(
                res => {
                   const val = res.data;
                   console.log("Success");
                   alert("Logged in!");
                   //this.context.router.history.push('/');
                   window.location.replace("http://localhost:3000/about")
               })
            .catch(error => {
                console.log("Catch");
                alert("Invalid credentials!")
                console.log(error)

            })
    }


    render() {
        return (

            <Container maxWidth="sm">
                <Navbar/>
                <div>
                    <Grid>
                        <form onSubmit={this.onSubmitFun}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="string"
                                onChange={this.handleInput}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={this.handleInput}
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Sign In
                            </Button>
                        </form>
                    </Grid>
                </div>
            </Container>
        );
    }
}
export default LoginPage;
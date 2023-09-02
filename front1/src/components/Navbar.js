import React from 'react'
import "../components/Navbar.css";
import {Search} from '@material-ui/icons';
import {Login} from '@mui/icons-material';
import {Badge, Button} from "@material-ui/core";

class Navbar extends React.Component {
    onSubmitFun = event => {
        event.preventDefault();
        localStorage.setItem("urlCrt", "http://localhost:3000/auth/login")
        window.location.replace("http://localhost:3000/auth/login")
    }
    goHome = event =>{
        event.preventDefault();
        window.location.replace("http://localhost:3000")
    }
    switchToRo = event => {
        event.preventDefault();
        localStorage.setItem("language", "ro");
        window.location.replace(localStorage.getItem("urlCrt"))
    }
    switchToEn = event => {
        event.preventDefault();
        localStorage.setItem("language", "en");
        window.location.replace(localStorage.getItem("urlCrt"))
    }
    render() {
        localStorage.setItem("language", "en");
        return (
            <div className="NavbarName">
                <div className="Left">
                    <h1 className="Logo" onClick={this.goHome}>
                        LAMA.
                    </h1>
                </div>
                <div className="Center">
                    <div className="SearchC">
                        <input className="Input"/>
                        <Search style={{color: "gray", fontSize: 26}}/>
                    </div>
                </div>
                    <div className="Right">
                        <div className="MenuItem">
                            <form onSubmit={this.onSubmitFun}>
                                <Button type="submit">
                                    <Login/>
                                </Button>
                            </form>
                        </div>
                        <div className="MenuItem">
                            <form  ><Button onClick={this.switchToEn}>en</Button></form>
                        </div>
                        <div className="MenuItem">
                            <form  ><Button onClick={this.switchToRo}>ro</Button></form>
                        </div>
                    </div>
            </div>
        )
    }
}
export default Navbar;
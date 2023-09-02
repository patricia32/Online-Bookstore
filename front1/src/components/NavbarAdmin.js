import React from 'react'
import "../components/NavbarUser.css";

import axiosInstance from "axios";

class NavbarUser extends React.Component {
    constructor() {
        super();
        this.language = localStorage.getItem("language");
    }
    onSubmitLogout = event => {
        event.preventDefault();
        let idClient = JSON.parse(localStorage.getItem('id'));
        axiosInstance.put("http://localhost:8081/auth/logout/" + idClient)
            .then( window.location.replace("http://localhost:3000"))

    }

    goHome = event =>{
        event.preventDefault();
        window.location.replace("http://localhost:3000/admin/homepage")
    }

    render() {
        return (
            <div className="NavbarName">
                <div className="Left">
                    <h1 className="Logo" onClick={this.goHome}>
                        LAMA.
                    </h1>
                </div>
                <div className="Center">
                </div>
                <div className="Right">
                    <div className="MenuItem">
                        <form onClick={this.onSubmitLogout}><button className="Button2"  >LOG OUT</button></form>
                    </div>
                </div>

            </div>
        )
    }
}
export default NavbarUser;
import React, { Component } from 'react';
import './login.css';
import {BrowserRouter, Route, Link , Redirect} from 'react-router-dom';
import axios from 'axios';
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded"
class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            user: null
        };
    }

    componentWillMount() {
        this.setState({isLogIn: localStorage.getItem("user")})
    }
    handleClick(event) {
        var apiBaseUrl = "http://localhost:8080/api/user/";
        var self = this;
        var passwordHash = require('password-hash');
        var pas=this.state.password;
        var CryptoJS = require("crypto-js");
        var hashedPassword= CryptoJS.MD5(pas)
       this.state.password =(hashedPassword+"")

        var payload = {
            "email": this.state.email,
            "password": this.state.password
        }
        axios.put(apiBaseUrl + 'login', payload)
            .then((response) => {
                if(response.data.userId != 0) {
                    console.log("Login successfull");
                    localStorage.setItem("user", JSON.stringify(response.data))
                    this.setState({user: response.data});
                } else {
                    console.log("User not found");
                }
            })
            .catch(function (error) {
               
            });
    }


    render(){
        return (
            <div className="login-container">
            {this.state.user && <Redirect to="/sherbime" />}
                <div className="login-box">
                    <div>
                        <h1>Please login to continue </h1>
                    </div>

                    <div>
                        <label for="email"><b>Email</b></label>
                    </div>
                    <div>
                        <input type="text" placeholder='your email goes here' required
                        onChange = {(event,newValue) => this.setState({email: event.target.value})}
                         />
                    </div>
                    <div>
                        <label for="text"><b>Password</b></label>
                    </div>
                    <div>
                        <input type="password" placeholder='your password goes here' required
                        onChange = {(event,newValue) => this.setState({password:event.target.value})}
                        />
                    </div>

                    <div className="clearfix">
                    <div className="row">
                        <div className="col-md-10">
                            <button className="signupbtn green-btn" onClick={(event) => this.handleClick(event)} >Login</button>
                        </div>
                        <div className="col-md-2 register-button-container">
                            <Link to="/register" className="registerLink" > Register</Link>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}


export default LoginComponent;
